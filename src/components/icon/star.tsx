import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  selected?: boolean;
};
const StarIcon: FC<Props> = ({ selected }) => {
  return (
    <svg
      width="37"
      height="34"
      viewBox="0 0 37 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(
        "cursor-pointer",
        selected ? "fill-[#FFBC57]" : "fill-[#D9D9D9]"
      )}
    >
      <path
        d="M18.5 0L24.6982 9.96892L36.0945 12.7832L28.5289 21.7586L29.374 33.4668L18.5 29.045L7.62597 33.4668L8.47111 21.7586L0.905455 12.7832L12.3018 9.96892L18.5 0Z"
        style={{ color: "currentcolor" }}
        className="current-color"
      />
    </svg>
  );
};

export default StarIcon;
