"use client";

import { useEffect } from "react";
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
import { Store } from "@/entities/store";
import { UseFormReturn } from "react-hook-form";
import { trackDefaultAttributes, trackEvent } from "@/lib/analytics";
import { EventName, EventKey } from "@/lib/analytics/events";

const FALLBACK_ERROR_TEXT = "Something went wrong! Try Again!";

const useGenerateReview = ({
  store,
  customFieldForm,
}: {
  store: Store;
  customFieldForm: UseFormReturn;
}) => {
  const [screen, setScreen] = useState<REVIEW_SCREENS>(REVIEW_SCREENS.GENERATE);
  const [bufferText, setBufferText] = useState("");
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isLoading, setLoading] = useState(false);
  const endComponent = useRef<HTMLDivElement>(null);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [selectedReview, setSelectedReview] = useState<TReview>();
  const [rating, setRating] = useState(5);
  const { toast } = useToast();

  useEffect(() => {
    trackDefaultAttributes({
      [EventKey.STORE_ID]: store.id,
      [EventKey.STORE_NAME]: store.name,
      [EventKey.STORE_TYPE]: store.type.name,
    });
  }, []);

  const updateReview = (reviewIdx: number, review: string) => {
    const newReviews = reviews.map((reviewObj, idx) => {
      if (idx === reviewIdx) {
        return { ...reviewObj, review };
      }
      return reviewObj;
    });
    setReviews(newReviews);
    toast({
      description: "The Review has been updated.",
      variant: "default",
    });
  };

  const goBack = (screen: REVIEW_SCREENS = REVIEW_SCREENS.GENERATE) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Screen", { screen });
    if (screen === REVIEW_SCREENS.GENERATE) {
      setReviews([]);
      console.log("clearing reviews");
    }
    setScreen(screen);
  };

  // TODO : Fix Reset
  const reset = () => {
    setBufferText("");
    setScreen(REVIEW_SCREENS.GENERATE);
    setReviews([]);
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

    trackEvent(EventName.SHARE_REVIEW_CLICK, {
      [EventKey.REVIEW]: review.review,
    });
  };

  const handleCopyToClipboard = (text: string) => {
    trackEvent(EventName.COPY_TO_CLIPBOARD, {
      [EventKey.REVIEW]: text,
    });

    copyToClipboard(text);
    toast({
      description: "The Review has been copied to clipboard.",
      variant: "default",
    });
  };

  const initiateGenerateReview = async () => {
    for (let i = 0; i < 3; i++) {
      await generateReview();
    }
  };

  const getPayload = () => {
    const customFieldValues = customFieldForm.getValues();
    const customField = store.customField?.map((x) => ({
      ...x,
      value: customFieldValues[x.name],
    }));

    const payload: ReviewRequestSchemaType = {
      name: store.name,
      platform: "Google Reviews",
      location: `${store.address ? store.address : ""} ${store.city}, ${
        store.country
      }`,
      type: store.type.name,
      rating: rating,
      storeId: store.id,
      customField: customField,
    };

    return payload;
  };

  const checkIfFormValid = () => {
    return new Promise((resolve) => {
      customFieldForm.handleSubmit(
        (data) => {
          console.log("checkIfFormValid", data);
          resolve(true);
        },
        (error) => {
          console.error("checkIfFormValid", error);
          resolve(false);
        }
      )();
    });
  };

  const generateReview = async (signal?: AbortSignal) => {
    return new Promise(async (resolve) => {
      if (isLoading) {
        return;
      }

      const isFormValid = await checkIfFormValid();
      if (!isFormValid) {
        return;
      }

      const reviewRequest = getPayload();
      setBufferText("");
      setLoading(true);
      setScreen(REVIEW_SCREENS.GENERATED);
      scrollToEndSection(1000);

      trackEvent(EventName.GENERATE_REVIEW, {
        [EventKey.RATING]: reviewRequest.rating,
      });

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

            trackEvent(EventName.GENERATION_SUCCESS, {
              [EventKey.RATING]: reviewRequest.rating,
              [EventKey.REVIEW]: stringData,
            });

            resolve("");
          }
        }
      } catch (err) {
        console.log(err);
      }

      return { error: null };
    });
  };

  return {
    screen,
    goBack,
    generateReview,
    initiateGenerateReview,
    handleCopyToClipboard,
    selectReview,
    updateReview,
    rating,
    setRating,
    selectedReview,
    bufferText,
    reviews,
    isLoading,
    endComponent,
  };
};

export default useGenerateReview;
