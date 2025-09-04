import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import WaterIcon from "./WaterIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <WaterIcon className="text-background" size={32} />
              <div>
                <h3 className="text-xl font-bold">RainWise</h3>
                <p className="text-sm text-background/70">Smart Water Management</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Empowering communities across India to harness the power of rainwater. 
              Building a sustainable future one rooftop at a time through intelligent 
              water management solutions.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground">
                <Linkedin size={20} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#home" className="hover:text-background transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#impact" className="hover:text-background transition-colors">Impact</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Contact Us</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">info@rainwise.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
            
            {/* Language Support */}
            <div className="mt-6">
              <h5 className="font-medium mb-2 text-background">Available in:</h5>
              <div className="flex gap-2 text-sm">
                <span className="bg-background/10 px-2 py-1 rounded">English</span>
                <span className="bg-background/10 px-2 py-1 rounded">हिंदी</span>
                <span className="bg-background/10 px-2 py-1 rounded">मराठी</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/70 text-sm">
              © {currentYear} RainWise. All rights reserved. | Building a water-secure future for India.
            </p>
            <div className="flex gap-6 text-sm text-background/70">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-background transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;