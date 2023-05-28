"use client";

import ReviewCard from "../review-card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { SampleReviews } from "./data";

export default function LandingPage() {
  const goToSection = () => {
    const section = document.querySelector("#review-generator-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-landing py-20">
      <div className="max-w-2xl text-center px-10 mb-20">
        <h1 className="text-foreground font-bold tracking-tight text-3xl mb-4">
          Generate Reviews in a Jiffy!
        </h1>
        <p className="text-foreground mb-8">
          Our platform lets users effortlessly create authentic and compelling
          reviews. Whether you need reviews for products, services, books,
          movies, or any other category. With our advanced AI-powered platform,
          generating high-quality reviews has never been easier
        </p>

        <Button
          className="uppercase font-semibold"
          type="button"
          variant="default"
          onClick={goToSection}
        >
          Generate Now <ArrowRight className="ml-2" />
        </Button>
      </div>
      <div className="w-full flex gap-4 snap-x snap-proximity overflow-x-auto no-scrollbar">
        {SampleReviews.map((r, idx) => (
          <div
            key={idx}
            className="first:ml-8 last:mr-8 shrink-0 max-w-[500px] flex"
          >
            <ReviewCard review={r.review} reviewRequest={r.reviewRequest} />
          </div>
        ))}
      </div>
    </div>
  );
}
