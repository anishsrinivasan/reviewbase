import LandingPage from "@/components/landing-page/page";
import ReviewGeneratorForm from "@/components/review-generator-form";

export default function Home() {
  return (
    <main className="min-h-screen justify-between">
      <LandingPage />
      <ReviewGeneratorForm />
    </main>
  );
}
