import StoreHeader from "@/components/store-header";
import StarRating from "@/components/star-rating";
import IconRating from "@/components/icon-rating";
import { Button } from "@/components/ui/button";
import { Store } from "@/entities/store";

type Props = {
  store: Store;
  rating: number;
  setRating: (rating: number) => void;
  generateReview: () => void;
};

const GenerateReview = ({
  store,
  rating,
  setRating,
  generateReview,
}: Props) => {
  return (
    <div className="w-full">
      <div className="w-full min-h-screen">
        <div className="mb-[20px] w-full">
          <StoreHeader store={store} />
        </div>
        <h1 className="mb-[50px] text-center">The fastest way to write reviews</h1>
        <div className="w-full">
          <IconRating value={rating} />
        </div>
      </div>

      <div className="w-full sticky bottom-0">
        <div className="bg-[#1E2023] h-[70px] px-[20px] flex items-center">
          <StarRating
            value={Number(rating)}
            setRating={(rating) => setRating(rating)}
          />
        </div>
        <div className="bg-[#000000] py-[20px] flex justify-center items-center">
          <Button className="shine w-[200px]" onClick={generateReview}>
            Generate Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReview;
