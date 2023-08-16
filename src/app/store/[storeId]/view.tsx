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
    initiateGenerateReview,
    reviews,
    bufferText,
    goBack,
    endComponent,
    generateReview,
    selectReview,
    selectedReview,
    handleCopyToClipboard,
    updateReview,
  } = useGenerateReview();

  const getPayload = () => {
    const payload: ReviewRequestSchemaType = {
      name: store.name,
      platform: "Google Reviews",
      location: `${store.address ? store.address : ""} ${store.city}, ${
        store.country
      }`,
      type: store.type.name,
      rating: rating,
      storeId: store.id,
    };

    return payload;
  };

  const initFirstCall = () => {
    const payload = getPayload();
    initiateGenerateReview(payload);
  };

  const handleGenerateReview = () => {
    const payload = getPayload();
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
      generateReview={initFirstCall}
    />
  );
};

export default StoreView;
