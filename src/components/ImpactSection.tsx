import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Droplets, DollarSign, Leaf } from "lucide-react";

const ImpactSection = () => {
  const impacts = [
    {
      icon: Droplets,
      value: "50,000+",
      label: "Liters Saved",
      description: "Average annual rainwater harvesting potential per household",
      color: "primary"
    },
    {
      icon: DollarSign,
      value: "₹25,000",
      label: "Average Savings",
      description: "Yearly reduction in water bills and increased property value",
      color: "secondary" 
    },
    {
      icon: Leaf,
      value: "80%",
      label: "Groundwater Security",
      description: "Improvement in local groundwater levels with community adoption",
      color: "accent"
    },
    {
      icon: TrendingUp,
      value: "2-3 Years",
      label: "ROI Payback",
      description: "Time to recover investment through water savings and benefits",
      color: "primary"
    }
  ];

  const benefits = [
    "🌧️ Reduce dependency on municipal water supply",
    "💧 Improve local groundwater levels",
    "🏠 Increase property value",
    "🌱 Support sustainable development goals",
    "👥 Strengthen community water security",
    "📉 Lower monthly utility bills"
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Impact on Your
            <span className="block bg-gradient-water bg-clip-text text-transparent">
              Community & Wallet
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of households already making a difference with rainwater harvesting
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            const colorVariants = {
              primary: "text-primary bg-primary-soft",
              secondary: "text-secondary bg-secondary-soft",
              accent: "text-accent bg-accent-soft"
            };

            return (
              <Card key={index} className="text-center hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${colorVariants[impact.color as keyof typeof colorVariants]} mb-2`}>
                    <IconComponent size={24} />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                    {impact.value}
                  </CardTitle>
                  <CardDescription className="font-semibold text-foreground">
                    {impact.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {impact.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Grid */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 shadow-water">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Why Choose Rainwater Harvesting?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-lg">{benefit.split(' ')[0]}</span>
                <span className="text-muted-foreground">{benefit.substring(benefit.indexOf(' ') + 1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-nature bg-clip-text text-transparent text-lg font-semibold mb-2">
            🌍 Environmental Impact
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Every drop counts. When communities adopt rainwater harvesting, we create a ripple effect 
            that preserves groundwater, reduces urban flooding, and builds climate resilience for future generations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;