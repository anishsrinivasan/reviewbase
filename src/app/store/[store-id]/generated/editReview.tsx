import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { TReview } from "@/entities/review";
import { FC, useRef } from "react";

type Props = {
  isOpen: boolean;
  review: TReview | undefined;
  updateReview: (review: string) => void;
  onClose: () => void;
};

const EditReview: FC<Props> = ({ isOpen, review, updateReview, onClose }) => {
  const inputRef = useRef<HTMLTextAreaElement | any>();

  const handleSave = () => {
    const updatedText = inputRef.current.value;
    updateReview(updatedText);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Textarea
          ref={inputRef}
          placeholder="Write your review"
          defaultValue={review?.review}
          autoFocus
          rows={10}
        />
        <DialogFooter>
          <Button onClick={onClose} variant={"destructive"} type="submit">
            Discard
          </Button>
          <Button onClick={handleSave} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditReview;
