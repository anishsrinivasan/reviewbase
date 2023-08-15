import NextImage, { ImageProps } from "next/image";

type Props = ImageProps;

const Image = (props: Props) => {
  return <NextImage {...props} />;
};

export default Image;
