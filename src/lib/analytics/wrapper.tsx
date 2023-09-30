"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init("phc_S5ik2tPADQ7EdipOltZT7iIycAw8afYRfBE7D8TrG6G", {
    api_host: "https://app.posthog.com",
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
