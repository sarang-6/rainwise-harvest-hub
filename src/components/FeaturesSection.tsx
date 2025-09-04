import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calculator, FileText, Zap, Shield, Users } from "lucide-react";
import houseIcon from "@/assets/house-icon.jpg";
import rechargePit from "@/assets/recharge-pit.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Location Input",
      description: "Simply enter your location and roof area. Our AI analyzes local rainfall patterns and geographical data.",
      image: houseIcon,
      color: "primary"
    },
    {
      icon: Calculator,
      title: "Instant Assessment",
      description: "Get immediate calculations for water harvesting potential, recharge pit specifications, and cost estimates.",
      image: rechargePit,
      color: "secondary"
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Download comprehensive reports with technical specifications and step-by-step implementation guides.",
      color: "accent"
    },
    {
      icon: Zap,
      title: "Real-time Visualization",
      description: "Interactive GIS maps show optimal placement for rainwater harvesting systems on your property.",
      color: "primary"
    },
    {
      icon: Shield,
      title: "Sustainable Impact",
      description: "Track your environmental contribution: water saved, bills reduced, and groundwater preserved.",
      color: "secondary"
    },
    {
      icon: Users,
      title: "Community Ready",
      description: "Accessible interface designed for both rural farmers and urban residents with multilingual support.",
      color: "accent"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Start
            <span className="block bg-gradient-nature bg-clip-text text-transparent">
              Harvesting Rainwater
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From assessment to implementation, RainWise provides all the tools and insights 
            you need for successful rainwater harvesting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorVariants = {
              primary: "text-primary bg-primary-soft",
              secondary: "text-secondary bg-secondary-soft", 
              accent: "text-accent bg-accent-soft"
            };

            return (
              <Card key={index} className="group hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  {feature.image && (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${colorVariants[feature.color as keyof typeof colorVariants]} mb-4`}>
                    <IconComponent size={24} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Start Your Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;