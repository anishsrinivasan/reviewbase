import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { ReviewRequestSchemaType } from "@/entities/review";

type Props = {
  idx?: number;
  review: string;
  reviewRequest?: Partial<ReviewRequestSchemaType>;
  copyToClipBoard?: (review: string) => void;
};

const ReviewCard: FC<Props> = ({
  idx,
  review,
  reviewRequest,
  copyToClipBoard,
}) => {
  const showCardHeader = idx || copyToClipBoard;
  const showCardFooter = true && reviewRequest?.platform;

  return (
    <Card className="bg-card-gradient mb-[20px] py-6 relative">
      {showCardHeader ? (
        <CardHeader>
          <div className="flex justify-between items-center">
            {typeof idx !== "undefined" ? (
              <CardTitle>{idx + 1}</CardTitle>
            ) : null}
            {copyToClipBoard ? (
              <CopyIcon
                onClick={() => copyToClipBoard(review as string)}
                className="cursor-pointer"
              />
            ) : null}
          </div>
        </CardHeader>
      ) : null}

      <CardContent>
        <p className="text-md">{review}</p>
      </CardContent>

      {showCardFooter ? (
        <CardFooter className="h-[60px]">
          <div className="absolute bottom-4 right-4 flex w-full text-right justify-end">
            <Image
              src={`/${reviewRequest?.platform}.png`}
              width={50}
              height={50}
              className="rounded-lg"
              alt=""
            />
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default ReviewCard;
