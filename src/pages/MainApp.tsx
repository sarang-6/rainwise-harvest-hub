import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AssessmentForm from "@/components/AssessmentForm";
import ResultsSection from "@/components/ResultsSection";
import MapModal from "@/components/MapModal";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";
import { calculateRainwaterPotential } from "@/utils/calculations";
import { generatePDF } from "@/utils/pdfGenerator";
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

const MainApp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleAssessmentSubmit = async (data: AssessmentData) => {
    setIsLoading(true);
    setAssessmentData(data);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const calculatedResults = calculateRainwaterPotential(data);
      setResults(calculatedResults);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);

      toast({
        title: "Assessment Complete!",
        description: "Your rainwater harvesting potential has been calculated successfully.",
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!assessmentData || !results) return;

    try {
      toast({
        title: "Generating Report",
        description: "Creating your detailed PDF report..."
      });

      await generatePDF(assessmentData, results);
      
      toast({
        title: "Report Downloaded",
        description: "Your rainwater harvesting assessment report has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "There was an error generating the PDF report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShowMap = () => {
    if (!assessmentData) return;
    setShowMap(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
      
      {results && assessmentData && (
        <ResultsSection 
          results={results}
          location={assessmentData.location}
          onDownloadReport={handleDownloadReport}
          onShowMap={handleShowMap}
        />
      )}
      
      <ImpactSection />
      <Footer />
      
      {assessmentData && (
        <MapModal 
          isOpen={showMap}
          onClose={() => setShowMap(false)}
          location={assessmentData.location}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default MainApp;