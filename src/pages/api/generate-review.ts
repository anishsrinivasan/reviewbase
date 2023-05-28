import { failedEdgeResponse } from "@/pages/api";
import { API_RESPONSE_CODE } from "@/entities/api";
import { generateStreamUsingPrompt } from "@/lib/openai/generate-stream";
import { reviewRequestSchema } from "@/entities/review";
import { ipRateLimit } from "@/lib/ip-rate-limit";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  /*
   * Validate Post
   */

  const reqJsonBody = await req.json();
  const validator = reviewRequestSchema.safeParse(reqJsonBody);

  if (!validator.success) {
    return failedEdgeResponse({
      message: "Something went wrong, try later.",
      statusCode: 400,
      code: API_RESPONSE_CODE.VALIDATION,
    });
  }

  const res = await ipRateLimit(req);
  // If the status is not 200 then it has been rate limited.
  if (res.status !== 200) {
    return failedEdgeResponse({
      message: "Rate Limit Exceeded, Please try after sometime!",
      statusCode: 429,
      code: API_RESPONSE_CODE.RATE_LIMIT,
    });
  }

  const requestReview = validator.data;

  const stream = await generateStreamUsingPrompt(requestReview);

  return new Response(stream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

      // 'Content-Type': 'text/event-stream',
      "Cache-Control": "no-cache",
    }),
  });
}
