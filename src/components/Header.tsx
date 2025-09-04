import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import WaterIcon from "./WaterIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const languages = ["EN", "हिं", "मराठी"];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <WaterIcon size={32} />
            <div>
              <h1 className="text-xl font-bold text-foreground">RainWise</h1>
              <p className="text-xs text-muted-foreground">Smart Water Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors">Impact</a>
          </nav>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-muted-foreground" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-foreground border-none focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <Button variant="hero" size="lg">
              Check Your Potential
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
              <a href="#impact" className="text-foreground hover:text-primary transition-colors">Impact</a>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-muted-foreground" />
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-sm text-foreground border-none focus:outline-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <Button variant="hero">
                  Check Your Potential
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;