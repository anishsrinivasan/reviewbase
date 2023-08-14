import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Store } from "@/entities/store";
import ReviewCard from "@/components/v2/review-card";
import { TReview } from "@/entities/review";
import Back from "@/components/icon/back";

type Props = {
  store: Store;
  rating: number;
  goBack: () => void;
  generateReview: () => void;
  bufferText: string;
  reviews: TReview[];
  isLoading: boolean;
  endComponent: any;
  handleCopyToClipboard: (review: string) => void;
};

const Generated = ({
  rating,
  goBack,
  generateReview,
  bufferText,
  isLoading,
  reviews,
  handleCopyToClipboard,
  endComponent,
}: Props) => {
  return (
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
            onShare={handleCopyToClipboard}
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
          <Button className="w-[200px]" onClick={generateReview}>
            More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Generated;
