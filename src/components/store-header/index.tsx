import { FC } from "react";
import { Store } from "@/entities/store";
import Image from "@/components/image";

type Props = {
  store: Store;
};

const HEADER_SIZES = {
  width: "100%",
  height: 160,
};

const LOGO_SIZES = {
  width: 100,
  height: 100,
};

const StoreHeader: FC<Props> = ({ store }) => {
  return (
    <div className="relative w-full">
      <div
        className="relative"
        style={{
          height: HEADER_SIZES.height,
          width: HEADER_SIZES.width,
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{ background: "rgb(0 0 0 / 50%)" }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${store.headerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {store.logoImage ? (
        <div className="mt-[-70px] relative z-50 w-full">
          <div className="flex justify-center">
            <Image
              className="rounded-full border border-2"
              alt={store.name}
              src={store.logoImage}
              width={LOGO_SIZES.width}
              height={LOGO_SIZES.height}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StoreHeader;
