import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "@/components/image";
import { Store, Platforms } from "@/entities/store";
import Link from "next/link";

type Props = {
  store: Store;
};

const getPlatformURL = (platform: Platforms, value: string) => {
  if (platform === Platforms.Zomato) {
    return `http://zoma.to/r/${value}`;
  }

  if (platform === Platforms.Google) {
    return `https://search.google.com/local/writereview?placeid=${value}`;
  }

  return ``;
};

const ShareSection: FC<Props> = ({ store }) => {
  const sharePlatforms = store.storePlatform;

  if (sharePlatforms.length < 1) {
    return <></>;
  }

  return (
    <div className="bg-[#000000] py-[10px]">
      <div className="flex justify-center items-center">
        {sharePlatforms.map((share, idx) => {
          const platformImage = `/icons/${share.platform}.png`;
          const shareLink = getPlatformURL(share.platform, share.value);

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
                  alt={share.platform}
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
