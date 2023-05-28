import { useToast } from "@/components/ui/use-toast";
import { ReviewRequestSchemaType, TReview } from "@/entities/review";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { useState } from "react";

const FALLBACK_ERROR_TEXT = "Something went wrong! Try Again!";

const useGenerateSlide = () => {
  const [bufferText, setBufferText] = useState("");
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const reset = () => {
    setBufferText("");
  };

  const generateSlide = async (
    reviewRequest: ReviewRequestSchemaType,
    signal?: AbortSignal
  ) => {
    reset();
    setLoading(true);
    let stringData = "";

    try {
      const response = await fetch(`/api/generate-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...reviewRequest }),
        signal,
      });

      if (!response.ok) {
        setLoading(false);
        const resData = await response.json();
        console.log(response.body, resData);
        toast({
          description: resData?.message || FALLBACK_ERROR_TEXT,
          variant: "destructive",
        });
        return { error: FALLBACK_ERROR_TEXT };
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        setLoading(false);
        return { error: FALLBACK_ERROR_TEXT };
      }

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          try {
            const text = JSON.parse(data).text ?? "";
            stringData += text;
            setBufferText(stringData);
          } catch (e) {
            console.error(e);
          }
        }
      };

      // https://web.dev/streams/#the-getreader-and-read-methods
      const reader = data.getReader();
      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);

        if (done) {
          setLoading(false);
          setReviews((prevReview) => [
            ...prevReview,
            { review: stringData, reviewRequest },
          ]);
        }
      }
    } catch (err) {
      console.log(err);
    }

    return { error: null };
  };

  return { generateSlide, bufferText, reviews, isLoading };
};

export default useGenerateSlide;
