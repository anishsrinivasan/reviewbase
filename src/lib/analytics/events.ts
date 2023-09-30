export const EventName = {
  GENERATE_REVIEW: "generate-review",
  GENERATION_SUCCESS: "generate-success",
  COPY_TO_CLIPBOARD: "copy-to-clipboard",
  EDIT_REVIEW_CLICK: "edit-review-click",
  EDIT_REVIEW_UPDATED: "edit-review-updated",
  EDIT_REVIEW_DISMISSED: "edit-review-dismissed",
  SHARE_REVIEW_CLICK: "share-review-click",
} as const;

export type EventName = (typeof EventName)[keyof typeof EventName];

export const EventKey = {
  STORE_ID: "store-id",
  STORE_NAME: "store-name",
  STORE_TYPE: "store-type",
  REVIEW: "review",
  RATING: "rating",
} as const;

export type EventKey = (typeof EventKey)[keyof typeof EventKey];
