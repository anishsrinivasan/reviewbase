import { ReviewRequestSchemaType } from "@/entities/review";

type SampleReview = {
  review: string;
  reviewRequest: Partial<ReviewRequestSchemaType>;
};

export const SampleReviews: SampleReview[] = [
  {
    review: `Apple Store in Anna Nagar is the perfect place to buy an iPhone. The store is well-organized and the staff is knowledgeable and helpful. They have a wide range of iPhones to choose from, and the prices are competitive. The store is clean and well-maintained, and the customer service is excellent. I highly recommend Apple Store to anyone looking to purchase an iPhone. Overall, I would give this store a 5/5 rating.`,
    reviewRequest: { platform: "Google Reviews" },
  },
  {
    review: `I recently visited McDonalds in Italy, and I must say, the experience was amazing! The food was delicious, fresh and hot, and the service was top-notch. I loved the burgers and fries; they were mouth-watering and fulfilling. The ambiance was clean and welcoming, making it the perfect spot for a quick bite. I would highly recommend McDonalds to anyone looking for great food and service. Overall, I would give McDonalds a 5/5 rating!`,
    reviewRequest: { platform: "Zomato" },
  },
  {
    review: `I think TikTok app is a great social media platform. It's easy to use and has a lot of fun features that make it unique from other social media apps. The only drawback is that some of the content can be inappropriate or not suitable for all ages. Overall, I give it a rating of 4 out of 5.`,
    reviewRequest: { platform: "Play Store" },
  },
  {
    review: `Cultfit is the best fitness gym I have ever been to. The trainers are knowledgeable, motivating and friendly. The facilities are top-notch and always clean. The workout equipment is modern and well-maintained. I appreciate the variety of classes offered, including yoga, strength training, and cardio. The atmosphere is welcoming and inclusive. I highly recommend Cultfit to anyone looking for a great workout experience in Mumbai.`,
    reviewRequest: { platform: "App Store" },
  },
];
