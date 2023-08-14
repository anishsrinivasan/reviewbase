"use client";
import { useState } from "react";
import { SAMPLE_STORE } from "./data";
import GenerateReview from "./generateReview";
import Generated from "./generated";

import useGenerateReview from "@/hooks/use-generate-review";
import { REVIEW_SCREENS, ReviewRequestSchemaType } from "@/entities/review";

export default function Page() {
  const [rating, setRating] = useState(5);
  const {
    isLoading,
    screen,
    generateReview,
    reviews,
    bufferText,
    goBack,
    endComponent,
  } = useGenerateReview();
  const store = SAMPLE_STORE;

  const handleGenerateReview = () => {
    const payload: ReviewRequestSchemaType = {
      name: store.name,
      platform: "Google Reviews",
      location: `${store.city}, ${store.country}`,
      type: "Food Chain",
      rating: rating,
    };

    generateReview(payload);
    console.log(payload);
  };

  if (screen === REVIEW_SCREENS.GENERATED) {
    return (
      <Generated
        goBack={goBack}
        isLoading={isLoading}
        store={store}
        rating={rating}
        reviews={reviews}
        bufferText={bufferText}
        generateReview={handleGenerateReview}
        endComponent={endComponent}
      />
    );
  }

  return (
    <GenerateReview
      store={store}
      rating={rating}
      setRating={setRating}
      generateReview={handleGenerateReview}
    />
  );
}
