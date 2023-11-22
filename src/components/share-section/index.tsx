import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "@/components/image";
import { Store, Platforms } from "@/entities/store";
import Link from "next/link";

type Props = {
  store: Store;
  onShareClick: (platform: Platforms) => void;
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

const ShareSection: FC<Props> = ({ store, onShareClick }) => {
  const sharePlatforms = store.storePlatform;

  if (sharePlatforms.length < 1) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
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
              onClick={() => onShareClick(share.platform)}
              className="rounded-full flex justify-center py-[0px] px-[20px] mb-[14px] w-[250px]"
            >
              <Image
                className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] mr-4"
                alt={share.platform}
                width={40}
                height={40}
                src={platformImage}
              />
              <p>Share on {share.platform}</p>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default ShareSection;
