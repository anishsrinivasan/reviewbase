import StarRating from "@/components/star-rating";
import { Store } from "@/entities/store";
import Back from "@/components/icon/back";
import IconRating from "@/components/icon-rating";
import ShareSection from "@/components/share-section";
import { Button } from "@/components/ui/button";
import { REVIEW_SCREENS, TReview } from "@/entities/review";

type Props = {
  store: Store;
  rating: number;
  selectedReview: TReview | undefined;
  goBack: (screen: REVIEW_SCREENS) => void;
  handleCopyToClipboard: (review: string) => void;
};

const Share = ({
  store,
  selectedReview,
  rating,
  goBack,
  handleCopyToClipboard,
}: Props) => {
  const copyReview = () => {
    if (!selectedReview) {
      return;
    }

    handleCopyToClipboard(selectedReview.review);
  };

  const handleGoBack = () => {
    goBack(REVIEW_SCREENS.GENERATED);
  };

  return (
    <div className="relative w-full">
      <div className="bg-[#000000] sticky top-0 z-10 w-full">
        <div className="py-[20px] px-[20px] w-full">
          <div onClick={handleGoBack} className="cursor-pointer absolute">
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

      <div className="mt-[40px] min-h-screen">
        <div className="w-full">
          <div className="mb-[30px]">
            <IconRating value={rating} />
          </div>
          <div className="px-[20px]">
            <h2 className="text-center text-[20px] md:text-[24px] font-semibold mb-[10px]">
              Thank You
            </h2>
            <p className="text-center text-[14px] md:text-[18px] mb-[20px]">
              Your Review has been copied to clipboard.
              <br />
              Please use the below links to post your review to the {`store's`}{" "}
              page.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button onClick={copyReview}>Copy Review</Button>
          </div>
        </div>
      </div>

      <div className="sticky z-10 bottom-0 w-full">
        <ShareSection store={store} />
      </div>
    </div>
  );
};

export default Share;
