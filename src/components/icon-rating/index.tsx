import { FC, useState } from "react";
import Image from "../image";
import { twMerge } from "tailwind-merge";

type Props = {
  value: number;
};

const IMAGE_SIZE = 180;

const IconRating: FC<Props> = ({ value = 5 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleImageChange = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Adjust the duration to match your animation duration
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Image
        className={twMerge(isAnimating ? "pulsate" : "")}
        alt={`Rating ${value}`}
        src={`/rating/${value}.png`}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        onLoad={() => {
          handleImageChange();
        }}
        priority
      />
    </div>
  );
};

export default IconRating;
