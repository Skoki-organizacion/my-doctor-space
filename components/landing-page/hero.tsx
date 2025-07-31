import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Automate Smarter. Grow
            <br />
            Faster. <span className="text-primary">Why AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business with intelligent automation solutions that
            scale with your growth
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-lg border shadow-2xl">
              {/* Placeholder for hero image/video */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Hero Image/Video
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
