import * as z from "zod";

export const reviewRequestSchema = z.object({
  name: z.string().min(1).max(50),
  platform: z.string().min(1).max(50),
  type: z.string().min(1).max(50),
  rating: z.string().min(1).max(4),
  location: z.string().min(1).max(50),
  comments: z.string().min(1).max(200).optional(),
  feel: z.array(z.string()).optional(),
});

export type ReviewRequestSchemaType = z.infer<typeof reviewRequestSchema>;

export type TReview = {
  review: string;
  reviewRequest: ReviewRequestSchemaType;
};
