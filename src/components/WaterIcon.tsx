import { Droplets } from "lucide-react";

interface WaterIconProps {
  className?: string;
  size?: number;
}

const WaterIcon = ({ className = "", size = 24 }: WaterIconProps) => {
  return (
    <div className={`relative ${className}`}>
      <Droplets size={size} className="text-primary animate-float" />
      <div className="absolute inset-0 animate-ripple">
        <div className="w-full h-full rounded-full border-2 border-primary/30"></div>
      </div>
    </div>
  );
};

export default WaterIcon;