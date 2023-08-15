"use client";
import GenerateReview from "./generateReview";
import Generated from "./generated";

import useGenerateReview from "@/hooks/use-generate-review";
import { REVIEW_SCREENS, ReviewRequestSchemaType } from "@/entities/review";
import Share from "./share";
import { Store } from "@/entities/store";
import { FC } from "react";

type Props = {
  store: Store;
};

const StoreView: FC<Props> = ({ store }) => {
  const {
    rating,
    setRating,
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
    updateReview,
  } = useGenerateReview();

  const handleGenerateReview = () => {
    const payload: ReviewRequestSchemaType = {
      name: store.name,
      platform: "Google Reviews",
      location: `${store.address ? store.address : ""} ${store.city}, ${
        store.country
      }`,
      type: store.type.name,
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
        updateReview={updateReview}
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
};

export default StoreView;
