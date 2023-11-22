import { ReviewRequestSchemaType } from "@/entities/review";
import { OpenAIStream, OpenAIStreamPayload } from "./openai-stream";
import { ApolloDentalPrompt } from "./prompts";
import { getRandomAlphabetExceptX } from "@/lib/characters";
import { generateCustomField } from "./prompts/customField";

export const generateStreamUsingPrompt = async (
  requestReview: ReviewRequestSchemaType
) => {
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a review writing assistant who follows the user's inputs and writes reviews accurately.`,
      },
      { role: "user", content: getTextNewPrompt(requestReview) },
    ],
    temperature: 1,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
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
  if (requestReview.storeId === "de27c5f5-7460-463e-8cd9-4acf57f93bf3") {
    return ApolloDentalPrompt(requestReview);
  }

  let reviewPrompt = `Write a ${requestReview.platform} review for an ${
    requestReview.type
  } in ${requestReview.location} called ${requestReview.name}

  Follow the below rules:
  Start the review with the word starting with ${getRandomAlphabetExceptX()}

  ${generateCustomField(requestReview)}

  Keep it simple, precise
    Make sure the review is simple select a length of 50 words
    Give a review based on a rating for ${requestReview.rating}/5
    Tell stories and your experience
    Dont be repetitive
    use smileys and emojis somewhere in the middle to highlight some words 
    Write it like a human`;

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
