import { ReviewRequestSchemaType } from "@/entities/review";

export const generateCustomField = (requestReview: ReviewRequestSchemaType) => {
  const text = requestReview.customField?.reduce((acc, curr) => {
    if (curr.name && curr.value) {
      acc += `\n ${curr.promptText?.replace("<customField>", curr.value)}`;
    }
    return acc;
  }, "");

  return text;
};
