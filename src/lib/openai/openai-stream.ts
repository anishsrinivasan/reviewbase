import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
  } from "eventsource-parser";
  
  export type ChatGPTAgent = "user" | "system";
  
  export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
  }
  
  export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
  }
  
  export async function OpenAIStream(
    payload: OpenAIStreamPayload,
    {
      onProgress,
      onComplete,
    }: {
      onProgress: (chunk: string) => void;
      onComplete: (chunk: string) => Promise<void>;
    }
  ) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  
    const readableStream = new ReadableStream({
      async start(controller) {
        // callback
        const onParse = (event: ParsedEvent | ReconnectInterval) => {
          if (event.type === "event") {
            const data = event.data;
            controller.enqueue(encoder.encode(data));
          }
        };
        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse);
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    let counter = 0,
      bufferChunk = "";
  
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const data = decoder.decode(chunk);
        // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
        if (data === "[DONE]") {
          if (onComplete) {
            await onComplete(bufferChunk);
            console.log("Closing after onComplete..");
          }
          controller.terminate();
          return;
        }
        try {
          const json = JSON.parse(data);
          const text = json.choices[0].delta?.content || "";
          if (counter < 1 && (text.match(/\n/) || []).length) {
            // this is a prefix character (i.e., "\n\n"), do nothing
            return;
          }
          // stream transformed JSON resposne as SSE
  
          // Pass the chunked data to onProgress
          bufferChunk += text;
  
          if (onProgress) {
            onProgress(bufferChunk);
          }
  
          const payload = { text: text };
          // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
          );
          counter++;
        } catch (e) {
          // maybe parse error
          controller.error(e);
        }
      },
    });
  
    return readableStream.pipeThrough(transformStream);
  }
  