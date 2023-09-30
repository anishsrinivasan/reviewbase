import posthog from "posthog-js";

type Attributes = Record<string, string | number | any>;

export const trackDefaultAttributes = (attributes: Attributes) => {
  posthog.register(attributes);
};

export const trackEvent = (eventName: string, attributes: Attributes = {}) => {
  const analyticsAttributes = { ...(attributes || {}) };
  posthog.capture(eventName, analyticsAttributes);
};
