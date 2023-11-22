import { FC } from "react";
import { Store } from "@/entities/store";
import Image from "@/components/image";

type Props = {
  store: Store;
};

const LOGO_SIZES = {
  width: 90,
  height: 90,
};

const StoreHeader: FC<Props> = ({ store }) => {
  return (
    <div className="relative w-full">
      <div className="relative min-h-[130px] md:min-h-[160px]">
        <div
          className="absolute inset-0 z-10"
          style={{ background: "rgb(0 0 0 / 40%)" }}
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
        <div className="mt-[-50px] relative z-50 w-full">
          <div className="flex justify-center">
            <Image
              className="rounded-full w-[90px] h-[90px] border-2 bg-[#101010]"
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
