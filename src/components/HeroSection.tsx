import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calculator, TrendingUp } from "lucide-react";
import waterHero from "@/assets/water-hero.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute inset-0">
        <img 
          src={waterHero} 
          alt="Water conservation hero" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Floating water droplets animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/30 rounded-full animate-float`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transform Your Rooftop Into A{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Water Goldmine
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Instantly assess your rooftop rainwater harvesting potential. Save water, reduce bills, 
            and secure groundwater for future generations with smart AI-powered calculations.
          </p>

          {/* Key Features Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-primary-soft px-4 py-2 rounded-full">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Location-Based</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary-soft px-4 py-2 rounded-full">
              <Calculator size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">Instant Calculations</span>
            </div>
            <div className="flex items-center gap-2 bg-accent-soft px-4 py-2 rounded-full">
              <TrendingUp size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Cost-Benefit Analysis</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-3">
              Check Your Potential
              <ArrowRight size={20} />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Trusted by communities across India</p>
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
              <span>🏘️ Rural Communities</span>
              <span>🌆 Urban Societies</span>
              <span>🏢 Commercial Buildings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;