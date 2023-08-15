"use client";
import { useState } from "react";
import { SAMPLE_STORE } from "./data";
import GenerateReview from "./generateReview";
import Generated from "./generated";

import useGenerateReview from "@/hooks/use-generate-review";
import { REVIEW_SCREENS, ReviewRequestSchemaType } from "@/entities/review";
import Share from "./share";

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
    selectReview,
    selectedReview,
    handleCopyToClipboard,
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
  };

  if (screen === REVIEW_SCREENS.SHARE) {
    return (
      <Share
        goBack={goBack}
        store={store}
        rating={rating}
        selectedReview={selectedReview}
        handleCopyToClipboard={handleCopyToClipboard}
      />
    );
  }

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
        selectReview={selectReview}
        handleCopyToClipboard={handleCopyToClipboard}
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
