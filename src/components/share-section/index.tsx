import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "@/components/image";
import { Store, StoreIds, StorePlatforms } from "@/entities/store";
import Link from "next/link";

type Props = {
  store: Store;
};

const getPlatformURL = (storePlatform: StorePlatforms, storeIds: StoreIds) => {
  const storeId = storeIds[storePlatform];
  if (storePlatform === StorePlatforms.Zomato) {
    return `http://zoma.to/r/${storeId}`;
  }

  if (storePlatform === StorePlatforms.Google) {
    return `https://search.google.com/local/writereview?placeid=${storeId}`;
  }

  return ``;
};

const ShareSection: FC<Props> = ({ store }) => {
  const storeIds = store?.storeIds;
  const sharePlatforms = Object.keys(storeIds);

  if (!storeIds || sharePlatforms.length < 1) {
    return <></>;
  }

  return (
    <div className="bg-[#000000] py-[10px]">
      <div className="flex justify-center items-center">
        {sharePlatforms.map((share, idx) => {
          const platformImage = `/icons/${share}.png`;
          const shareLink = getPlatformURL(
            share as StorePlatforms,
            storeIds as StoreIds
          );

          if (!shareLink) {
            return <></>;
          }

          return (
            <Link target="_blank" key={idx} href={shareLink}>
              <Button
                key={idx}
                className="rounded-full flex justify-center w-[50px] h-[50px]  md:w-[60px] md:h-[60px] py-[0px] px-[0px] mr-[10px]"
                onClick={() => {}}
              >
                <Image
                  className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                  alt={share}
                  width={40}
                  height={40}
                  src={platformImage}
                />
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShareSection;
