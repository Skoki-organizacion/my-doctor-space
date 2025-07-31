import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Users, Globe, Lock, Zap } from "lucide-react";

export function AllFeatures() {
  const features = [
    {
      icon: Check,
      title: "Easy Integration",
      description:
        "Seamlessly integrate with your existing tools and workflows",
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "24/7 expert support to help you succeed",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built-in collaboration tools for your entire team",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy solutions worldwide with our global infrastructure",
    },
    {
      icon: Lock,
      title: "Advanced Security",
      description: "Enterprise-grade security and compliance features",
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Monitor performance with real-time insights and reporting",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            All Features <span className="text-primary">You Need</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate, optimize, and scale your business
            operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
