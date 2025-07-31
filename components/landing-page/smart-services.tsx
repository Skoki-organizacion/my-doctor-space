import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Database, Workflow, Brain, Cloud, Settings } from "lucide-react";

export function SmartServices() {
  const services = [
    {
      icon: Bot,
      title: "AI Chatbots",
      description: "Intelligent conversational AI for customer support",
      badge: "Popular",
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Advanced analytics and business intelligence",
      badge: "New",
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Streamline workflows and reduce manual tasks",
      badge: null,
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Custom ML models for your specific needs",
      badge: null,
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless integration with cloud platforms",
      badge: null,
    },
    {
      icon: Settings,
      title: "Custom Solutions",
      description: "Tailored automation solutions for your business",
      badge: "Enterprise",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Smart Services <span className="text-primary">Built for You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive automation solutions designed to transform your
            business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  {service.badge && (
                    <Badge variant="secondary">{service.badge}</Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
