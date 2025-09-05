import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Home, Calculator, FileDown } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: MapPin,
      title: "Enter Location & Details",
      description: "Provide your location and roof area. Our system automatically fetches local rainfall and geographical data.",
      details: ["GPS location or manual entry", "Roof area in square meters", "Building type selection"]
    },
    {
      step: "02", 
      icon: Calculator,
      title: "AI Analysis & Calculation",
      description: "Advanced algorithms calculate your rainwater harvesting potential and optimal system specifications.",
      details: ["Annual rainfall analysis", "Water harvesting capacity", "Recharge pit dimensions", "Cost estimation"]
    },
    {
      step: "03",
      icon: Home,
      title: "Customized Recommendations", 
      description: "Receive tailored suggestions for your property with GIS visualization and placement guidance.",
      details: ["3D visualization", "Optimal placement maps", "System sizing", "Implementation timeline"]
    },
    {
      step: "04",
      icon: FileDown,
      title: "Download & Implement",
      description: "Get detailed reports and guides to implement your rainwater harvesting system successfully.",
      details: ["Technical specifications", "Step-by-step guide", "Vendor recommendations", "Maintenance schedule"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How RainWise Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your rooftop into a sustainable water source
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-water"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div className="relative z-10 bg-background border-4 border-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                  
                  <Card className="text-center hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto rounded-full bg-primary-soft flex items-center justify-center mb-4">
                        <IconComponent size={24} className="text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </CardDescription>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center justify-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-24 z-20">
                      <ArrowRight size={24} className="text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => {
              document.getElementById('assessment')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Start Assessment Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;