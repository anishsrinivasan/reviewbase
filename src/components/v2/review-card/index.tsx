import { FC } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ReviewRequestSchemaType } from "@/entities/review";
import { Button } from "@/components/ui/button";

type Props = {
  idx?: number;
  review: string;
  reviewRequest?: Partial<ReviewRequestSchemaType>;
  showAction: boolean;
  onShare?: (review: string) => void;
  onEdit?: () => void;
};

const ReviewCard: FC<Props> = ({ review, showAction, onEdit, onShare }) => {
  const handleShare = () => {
    if (onShare) {
      onShare(review);
    }
  };
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <Card className="bg-transparent rounded-none border-0 border-b-2 border-b-[#1E2023] mt-[20px]">
      <CardContent>
        <p>{review || "....."}</p>
      </CardContent>
      {showAction ? (
        <CardFooter className="gap-4">
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default ReviewCard;
