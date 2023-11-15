import LandingPage from "@/components/landing-page/page";
import Signup from "./signup";
// import ReviewGeneratorForm from "@/components/review-generator-form";

export default function Home() {
  return (
    <main className="min-h-screen justify-between">
      <Signup />
      {/* <ReviewGeneratorForm /> */}
    </main>
  );
}
