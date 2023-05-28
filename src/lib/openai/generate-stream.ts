import { ReviewRequestSchemaType } from "@/entities/review";
import { OpenAIStream, OpenAIStreamPayload } from "./openai-stream";

export const generateStreamUsingPrompt = async (
  requestReview: ReviewRequestSchemaType
) => {
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: getTextNewPrompt(requestReview) }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
    n: 1,
  };

  const stream = OpenAIStream(payload, {
    onProgress: async (stringData) => {},
    onComplete: async (stringData) => {
      console.log("Completed Syncing...");
    },
  });

  return stream;
};

const getTextNewPrompt = (requestReview: ReviewRequestSchemaType) => {
  let reviewPrompt = `Write a ${requestReview.platform} review for an ${requestReview.type} in ${requestReview.location} called ${requestReview.name}

  Follow the below rules
  
  Keep it simple, precise
  Make sure the review is short 100 words
  Give a review based on the rating for ${requestReview.rating}/5`;

  if (requestReview.feel && requestReview.feel.length > 0) {
    reviewPrompt += `\n The Customer Feels "${requestReview.feel.join(
      ","
    )}" in this review.`;
  }

  if (requestReview.comments) {
    reviewPrompt += `\n Additional Comments from the customer : "${requestReview.comments}" Make sure to include them in the review `;
  }

  return reviewPrompt;
};
