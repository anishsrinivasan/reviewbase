import { useToast } from "@/components/ui/use-toast";
import {
  REVIEW_SCREENS,
  ReviewRequestSchemaType,
  TReview,
} from "@/entities/review";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { useState, useRef } from "react";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";

const FALLBACK_ERROR_TEXT = "Something went wrong! Try Again!";

const useGenerateReview = () => {
  const [screen, setScreen] = useState<REVIEW_SCREENS>(REVIEW_SCREENS.GENERATE);
  const [bufferText, setBufferText] = useState("");
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isLoading, setLoading] = useState(false);
  const endComponent = useRef<HTMLDivElement>(null);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [selectedReview, setSelectedReview] = useState<TReview>();

  const { toast } = useToast();

  const goBack = (screen: REVIEW_SCREENS = REVIEW_SCREENS.GENERATE) => {
    setScreen(screen);
  };

  const reset = () => {
    setBufferText("");
    setScreen(REVIEW_SCREENS.GENERATE);
  };

  const scrollToEndSection = (delay: number = 0) => {
    setTimeout(() => {
      endComponent?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, delay);
  };

  const selectReview = (review: TReview) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedReview(review);
    handleCopyToClipboard(review.review);
    setScreen(REVIEW_SCREENS.SHARE);
  };

  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text);
    toast({
      description: "The Review has been copied to clipboard.",
      variant: "default",
    });
  };

  const generateReview = async (
    reviewRequest: ReviewRequestSchemaType,
    signal?: AbortSignal
  ) => {
    if (isLoading) {
      return;
    }

    reset();
    setLoading(true);
    setScreen(REVIEW_SCREENS.GENERATED);
    scrollToEndSection(1000);
    let stringData = "";

    try {
      const response = await fetch(`/api/generate-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...reviewRequest }),
        signal,
      });

      if (!response.ok) {
        setLoading(false);
        const resData = await response.json();
        console.log(response.body, resData);
        toast({
          description: resData?.message || FALLBACK_ERROR_TEXT,
          variant: "destructive",
        });
        return { error: FALLBACK_ERROR_TEXT };
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        setLoading(false);
        return { error: FALLBACK_ERROR_TEXT };
      }

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          try {
            const text = JSON.parse(data).text ?? "";
            stringData += text;
            setBufferText(stringData);
          } catch (e) {
            console.error(e);
          }
        }
      };

      // https://web.dev/streams/#the-getreader-and-read-methods
      const reader = data.getReader();
      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);

        if (done) {
          setLoading(false);
          setReviews((prevReview) => [
            ...prevReview,
            { review: stringData, reviewRequest },
          ]);
        }
      }
    } catch (err) {
      console.log(err);
    }

    return { error: null };
  };

  return {
    screen,
    goBack,
    generateReview,
    handleCopyToClipboard,
    selectReview,
    selectedReview,
    bufferText,
    reviews,
    isLoading,
    endComponent,
  };
};

export default useGenerateReview;
