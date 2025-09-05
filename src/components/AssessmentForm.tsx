import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Home, Users, Calculator, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssessmentData {
  location: string;
  roofArea: number;
  dwellers: number;
  openSpace: number;
  buildingType: string;
  waterUsage: number;
  notes: string;
}

interface AssessmentFormProps {
  onSubmit: (data: AssessmentData) => void;
  isLoading: boolean;
}

const AssessmentForm = ({ onSubmit, isLoading }: AssessmentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AssessmentData>({
    location: '',
    roofArea: 0,
    dwellers: 1,
    openSpace: 0,
    buildingType: '',
    waterUsage: 150,
    notes: ''
  });

  const handleInputChange = (field: keyof AssessmentData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.location || !formData.roofArea || !formData.buildingType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to proceed with the assessment.",
        variant: "destructive"
      });
      return;
    }

    if (formData.roofArea < 10) {
      toast({
        title: "Invalid Roof Area",
        description: "Roof area should be at least 10 square meters for effective rainwater harvesting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assessment Started",
      description: "Analyzing your rainwater harvesting potential..."
    });

    onSubmit(formData);
  };

  return (
    <section id="assessment" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Your Personalized
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Rainwater Assessment
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your property details below to receive customized recommendations for rainwater harvesting
            </p>
          </div>

          <Card className="shadow-water border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calculator className="text-primary" size={24} />
                Property Assessment Details
              </CardTitle>
              <CardDescription>
                All fields marked with * are required for accurate calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      Location *
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter city, district, state"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll use this to fetch local rainfall data
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buildingType" className="flex items-center gap-2">
                      <Home size={16} className="text-primary" />
                      Building Type *
                    </Label>
                    <Select value={formData.buildingType} onValueChange={(value) => handleInputChange('buildingType', value)}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select building type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential House</SelectItem>
                        <SelectItem value="apartment">Apartment/Flat</SelectItem>
                        <SelectItem value="commercial">Commercial Building</SelectItem>
                        <SelectItem value="institutional">School/Institution</SelectItem>
                        <SelectItem value="industrial">Industrial Building</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Numeric Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="roofArea">Roof Area (sq. meters) *</Label>
                    <Input
                      id="roofArea"
                      type="number"
                      placeholder="e.g., 150"
                      value={formData.roofArea || ''}
                      onChange={(e) => handleInputChange('roofArea', parseInt(e.target.value) || 0)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Approximate rooftop area
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dwellers" className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      Number of People
                    </Label>
                    <Input
                      id="dwellers"
                      type="number"
                      placeholder="e.g., 4"
                      value={formData.dwellers}
                      onChange={(e) => handleInputChange('dwellers', parseInt(e.target.value) || 1)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      People living/working here
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="openSpace">Open Space (sq. meters)</Label>
                    <Input
                      id="openSpace"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.openSpace || ''}
                      onChange={(e) => handleInputChange('openSpace', parseInt(e.target.value) || 0)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Available space for structures
                    </p>
                  </div>
                </div>

                {/* Water Usage */}
                <div className="space-y-2">
                  <Label htmlFor="waterUsage">Daily Water Usage (liters per person)</Label>
                  <Input
                    id="waterUsage"
                    type="number"
                    placeholder="e.g., 150"
                    value={formData.waterUsage}
                    onChange={(e) => handleInputChange('waterUsage', parseInt(e.target.value) || 150)}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Average: Rural 40-60L, Urban 135-150L, Luxury 200-300L
                  </p>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements, soil type, existing water sources, etc."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="bg-background min-h-[80px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    disabled={isLoading}
                    className="px-8"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2" size={18} />
                        Calculate My Potential
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForm;