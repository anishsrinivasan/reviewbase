"use client";

import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import GenerateReview from "./generateReview";
import Generated from "./generated";
import useGenerateReview from "@/hooks/use-generate-review";
import { REVIEW_SCREENS } from "@/entities/review";
import Share from "./share";
import { Store } from "@/entities/store";

type Props = {
  store: Store;
};

const StoreView: FC<Props> = ({ store }) => {
  const customFieldForm = useForm({ defaultValues: {} });

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
  } = useGenerateReview({ store, customFieldForm });

  const initFirstCall = () => {
    initiateGenerateReview();
  };

  const handleGenerateReview = () => {
    generateReview();
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
    <FormProvider {...customFieldForm}>
      <GenerateReview
        store={store}
        rating={rating}
        setRating={setRating}
        generateReview={initFirstCall}
      />
    </FormProvider>
  );
};

export default StoreView;
