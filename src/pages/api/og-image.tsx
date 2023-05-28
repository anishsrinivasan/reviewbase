/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
import { SampleReviews } from "@/components/landing-page/data";

// Image generation
export default async function Image() {
  const review = SampleReviews[0].review;
  const reviewRequest = SampleReviews[0].reviewRequest;
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          backgroundImage:
            "linear-gradient( 111.4deg, rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(15px)",
            padding: 20,
            paddingBottom: 80,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <p>{review}</p>
          <img
            alt=""
            style={{ position: "absolute", bottom: 10, right: 10 }}
            src={`https://review-base.vercel.app/_next/image?url=${reviewRequest?.platform}.png&w=64&q=75`}
            width={64}
            height={64}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 30,
            right: 30,
            fontSize: 20,
          }}
        >
          Powered by
          <p style={{ marginLeft: 4, fontWeight: "900" }}>ReviewBase</p>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
