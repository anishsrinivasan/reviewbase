import { FC } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

/**
 * Back Nav button svg icon used on header component
 *
 * @param {*} { fill = "#676767" }
 */
const Back: FC<{ fill?: string }> = ({ fill = "#676767" }) => (
  <ArrowLeftIcon width={26} height={26} />
);

export default Back;
