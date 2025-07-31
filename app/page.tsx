import { AllFeatures } from "@/components/landing-page/all-features";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { SmartServices } from "@/components/landing-page/smart-services";
import { WhyChoose } from "@/components/landing-page/why-choose";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <WhyChoose />
      <SmartServices />
      <AllFeatures />
      <Footer />
    </div>
  );
}
