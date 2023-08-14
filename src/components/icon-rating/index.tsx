import { FC } from "react";
import Image from "../image";

type Props = {
  value: number;
};

const IMAGE_SIZE = 180;

const IconRating: FC<Props> = ({ value = 5 }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <Image
        alt={`Rating ${value}`}
        src={`../rating/${value}.svg`}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
      />
    </div>
  );
};

export default IconRating;
