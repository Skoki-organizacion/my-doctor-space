import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function Hero() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/25" />

      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10 w-full">
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1
            className={`${playfairDisplay.className} text-4xl sm:text-5xl lg:text-8xl font-bold text-white mb-6 leading-tight`}
          >
            Where Quality Meets
            <span className="text-primary"> Care</span>.
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Confirmation of strategy and concept from the best-known leaders in
            the field of clinical research in verified confirmed circumstances.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={
                session
                  ? session?.user.email === "milosstojsavljevic93@gmail.com"
                    ? "/admin/dashboard"
                    : "/dashboard"
                  : "/sign-in"
              }
            >
              <Button size="lg" className="w-full sm:w-auto opacity-100 z-10">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
