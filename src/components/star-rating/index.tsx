"use client";
import { FC } from "react";
import StarIcon from "@/components/icon/star";

type Props = {
  value: number;
  defaultValue?: number;
  total?: number;
  setRating?: (rating: number) => void;
};

const StarRating: FC<Props> = ({
  total = 5,
  value = 5,
  setRating = () => {},
}) => {
  const handleClick = (idx: number) => {
    const rating = idx + 1;
    setRating(rating);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {Array(total)
        .fill(null)
        .map((_, i) => (
          <div key={i} onClick={() => handleClick(i)}>
            <StarIcon selected={value >= i + 1} />
          </div>
        ))}
    </div>
  );
};

export default StarRating;
