import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  onChange: (e: string[]) => void;
  options: Option[];
  value: string[];
  disabled?: boolean;
  containerClassName?: string;
};

const MultiSelectChips: FC<Props> = ({
  options,
  onChange = () => {},
  containerClassName,
  value = [],
}) => {
  const handleChange = (selected: Option) => {
    const isExist = value.includes(selected.value);
    let newValues = [];
    if (isExist) {
      newValues = value.filter((x) => x !== selected.value);
    } else {
      newValues = [...value, selected.value];
    }
    onChange(newValues);
  };

  const cn = twMerge("flex flex-wrap gap-2", containerClassName);

  return (
    <div className={cn}>
      {options.map((option) => {
        const isSelected = value.includes(option.value);

        return (
          <div
            onClick={() => handleChange(option)}
            className={`${
              isSelected ? "bg-[#FFFFFF] text-gray-700" : ""
            } border-[0.5px] border-C272C30 cursor-pointer rounded-full px-[10px] py-[6px] text-14`}
            key={option.value}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectChips;
