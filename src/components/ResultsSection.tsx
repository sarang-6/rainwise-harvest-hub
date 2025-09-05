import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Home, Ruler, DollarSign, MapPin, FileDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssessmentResults {
  harvestedWater: number;
  structureType: string;
  dimensions: {
    length: number;
    width: number;
    depth: number;
  };
  estimatedCost: number;
  rainfall: number;
  aquiferDepth: number;
  paybackPeriod: number;
  waterSaved: number;
  monthlySavings: number;
}

interface ResultsSectionProps {
  results: AssessmentResults;
  location: string;
  onDownloadReport: () => void;
  onShowMap: () => void;
}

const ResultsSection = ({ results, location, onDownloadReport, onShowMap }: ResultsSectionProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getStructureIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pit': return '🕳️';
      case 'trench': return '〰️';
      case 'tank': return '🏺';
      default: return '💧';
    }
  };

  const getStructureDescription = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pit':
        return 'Ideal for areas with good soil permeability and moderate space';
      case 'trench':
        return 'Perfect for elongated spaces and areas with limited depth availability';
      case 'tank':
        return 'Recommended for water storage and areas with poor soil infiltration';
      default:
        return 'Customized solution based on your property specifications';
    }
  };

  return (
    <section id="results" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Rainwater Harvesting
              <span className="block bg-gradient-water bg-clip-text text-transparent">
                Potential Report
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Based on your property details and local conditions in {location}
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-soft flex items-center justify-center mb-2">
                  <Droplets size={24} className="text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {formatNumber(results.harvestedWater)}L
                </CardTitle>
                <CardDescription className="font-semibold text-foreground">
                  Annual Water Potential
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Total rainwater you can harvest yearly
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary-soft flex items-center justify-center mb-2">
                  <DollarSign size={24} className="text-secondary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  ₹{formatNumber(results.estimatedCost)}
                </CardTitle>
                <CardDescription className="font-semibold text-foreground">
                  Implementation Cost
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  One-time setup investment
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-accent-soft flex items-center justify-center mb-2">
                  <Home size={24} className="text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                  {getStructureIcon(results.structureType)} {results.structureType}
                </CardTitle>
                <CardDescription className="font-semibold text-foreground">
                  Recommended Structure
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  {getStructureDescription(results.structureType)}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-water transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary-soft flex items-center justify-center mb-2">
                  <span className="text-2xl">💰</span>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {results.paybackPeriod} Years
                </CardTitle>
                <CardDescription className="font-semibold text-foreground">
                  Payback Period
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Time to recover investment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Structure Details */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="text-primary" size={20} />
                  Structure Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Length</Label>
                    <p className="text-lg font-semibold text-foreground">{results.dimensions.length}m</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Width</Label>
                    <p className="text-lg font-semibold text-foreground">{results.dimensions.width}m</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Depth</Label>
                    <p className="text-lg font-semibold text-foreground">{results.dimensions.depth}m</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Volume</Label>
                    <p className="text-lg font-semibold text-foreground">
                      {formatNumber(results.dimensions.length * results.dimensions.width * results.dimensions.depth)}m³
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                          <Info size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Why this structure?</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Structure type selected based on available space, soil conditions, and optimal water infiltration for your area.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {/* Local Conditions */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  Local Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Annual Rainfall</span>
                    <Badge variant="secondary">{results.rainfall}mm</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Aquifer Depth</span>
                    <Badge variant="secondary">{results.aquiferDepth}m</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Water Saved Monthly</span>
                    <Badge variant="secondary">{formatNumber(results.waterSaved)}L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly Bill Savings</span>
                    <Badge variant="secondary">₹{formatNumber(results.monthlySavings)}</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Data sourced from local meteorological and geological surveys for {location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={onDownloadReport} variant="hero" size="lg" className="px-8">
              <FileDown className="mr-2" size={18} />
              Download Detailed Report
            </Button>
            <Button onClick={onShowMap} variant="outline" size="lg" className="px-8">
              <MapPin className="mr-2" size={18} />
              View Location Map
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for labels
const Label = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);

export default ResultsSection;