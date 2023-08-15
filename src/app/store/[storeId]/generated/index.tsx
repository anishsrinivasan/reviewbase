"use client";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Store } from "@/entities/store";
import ReviewCard from "@/components/v2/review-card";
import { TReview } from "@/entities/review";
import Back from "@/components/icon/back";
import EditReview from "./editReview";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  store: Store;
  rating: number;
  goBack: () => void;
  generateReview: () => void;
  bufferText: string;
  reviews: TReview[];
  isLoading: boolean;
  endComponent: any;
  selectReview: (review: TReview) => void;
  handleCopyToClipboard: (review: string) => void;
  updateReview: (reviewIdx: number, review: string) => void;
};

const Generated = ({
  rating,
  goBack,
  generateReview,
  bufferText,
  isLoading,
  reviews,
  selectReview,
  updateReview,
  endComponent,
}: Props) => {
  const [currentReview, setCurrentReview] = useState<{
    idx: number;
    review: TReview;
  }>();

  const handleUpdateReview = (review: string) => {
    if (!currentReview) {
      return;
    }

    updateReview(currentReview?.idx, review);
  };

  const handleEdit = (idx: number, review: TReview) => {
    setCurrentReview({ idx, review });
  };

  const dismissEdit = () => {
    setCurrentReview(undefined);
  };

  return (
    <>
      <div className="relative w-full">
        <div className="bg-[#000000] sticky top-0 z-10 w-full">
          <div className="py-[20px] px-[20px] w-full">
            <div onClick={goBack} className="cursor-pointer absolute">
              <Back />
            </div>
            <h2 className="text-center text-[20px] font-semibold">
              Review Options
            </h2>
            <div></div>
          </div>

          <div className="bg-[#1E2023] py-[20px] px-[20px] w-full flex items-center">
            <StarRating value={Number(rating)} />
          </div>
        </div>

        <div className="mb-[200px] min-h-screen">
          {reviews.map((r, idx) => (
            <ReviewCard
              showAction
              review={r.review}
              key={idx}
              idx={idx}
              onShare={() => selectReview(r)}
              onEdit={() => handleEdit(idx, r)}
            />
          ))}

          {isLoading ? (
            <ReviewCard
              showAction={false}
              review={bufferText}
              idx={reviews.length}
            />
          ) : null}
          <div ref={endComponent} />
        </div>

        <div className="sticky z-10 bottom-0 w-full">
          <div className="bg-[#000000] py-[20px] flex justify-center items-center">
            <Button
              disabled={isLoading}
              className="w-[200px]"
              onClick={generateReview}
            >
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? "Generating" : "More"}
            </Button>
          </div>
        </div>
      </div>

      <EditReview
        isOpen={currentReview ? true : false}
        review={currentReview?.review}
        updateReview={handleUpdateReview}
        onClose={dismissEdit}
      />
    </>
  );
};

export default Generated;
