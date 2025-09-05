import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export const generatePDF = async (data: AssessmentData, results: AssessmentResults) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Header
  pdf.setFillColor(59, 130, 246); // Primary blue
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RainWise Assessment Report', margin, 25);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, 35);

  // Reset text color
  pdf.setTextColor(0, 0, 0);
  let yPosition = 60;

  // Property Information Section
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Property Information', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const propertyInfo = [
    `Location: ${data.location}`,
    `Building Type: ${data.buildingType}`,
    `Roof Area: ${data.roofArea} square meters`,
    `Number of Occupants: ${data.dwellers}`,
    `Available Open Space: ${data.openSpace} square meters`,
    `Daily Water Usage: ${data.waterUsage} liters per person`
  ];

  propertyInfo.forEach(info => {
    pdf.text(info, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Assessment Results Section
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Assessment Results', margin, yPosition);
  yPosition += 10;

  // Key metrics in boxes
  const metrics = [
    { label: 'Annual Harvesting Potential', value: `${results.harvestedWater.toLocaleString()} liters` },
    { label: 'Recommended Structure', value: results.structureType },
    { label: 'Implementation Cost', value: `₹${results.estimatedCost.toLocaleString()}` },
    { label: 'Payback Period', value: `${results.paybackPeriod} years` }
  ];

  const boxWidth = (contentWidth - 10) / 2;
  const boxHeight = 25;
  let boxX = margin;
  let boxY = yPosition;

  metrics.forEach((metric, index) => {
    if (index % 2 === 0 && index > 0) {
      boxY += boxHeight + 5;
      boxX = margin;
    } else if (index % 2 === 1) {
      boxX = margin + boxWidth + 10;
    }

    // Draw box
    pdf.setFillColor(240, 249, 255);
    pdf.rect(boxX, boxY, boxWidth, boxHeight, 'F');
    pdf.setDrawColor(59, 130, 246);
    pdf.rect(boxX, boxY, boxWidth, boxHeight, 'S');

    // Add text
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(metric.label, boxX + 5, boxY + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(metric.value, boxX + 5, boxY + 16);

    if (index % 2 === 0) {
      boxX = margin + boxWidth + 10;
    }
  });

  yPosition = boxY + boxHeight + 20;

  // Structure Specifications
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Structure Specifications', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const structureSpecs = [
    `Type: ${results.structureType}`,
    `Dimensions: ${results.dimensions.length}m × ${results.dimensions.width}m × ${results.dimensions.depth}m`,
    `Volume: ${(results.dimensions.length * results.dimensions.width * results.dimensions.depth).toFixed(1)} cubic meters`
  ];

  structureSpecs.forEach(spec => {
    pdf.text(spec, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Local Conditions
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Local Environmental Data', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const localConditions = [
    `Annual Rainfall: ${results.rainfall}mm`,
    `Estimated Aquifer Depth: ${results.aquiferDepth}m`,
    `Monthly Water Savings: ${results.waterSaved.toLocaleString()} liters`,
    `Monthly Bill Savings: ₹${results.monthlySavings.toLocaleString()}`
  ];

  localConditions.forEach(condition => {
    pdf.text(condition, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 15;

  // Implementation Recommendations
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Implementation Recommendations', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const recommendations = [
    '• Install first flush diverter to improve water quality',
    '• Use appropriate mesh filters to prevent debris accumulation',
    '• Schedule regular maintenance every 6 months',
    '• Consider connecting to existing plumbing system for optimal utilization',
    '• Monitor local groundwater levels annually',
    '• Ensure proper slope for efficient water collection',
    '• Use eco-friendly materials for construction when possible'
  ];

  recommendations.forEach(rec => {
    pdf.text(rec, margin, yPosition);
    yPosition += 6;
  });

  // Footer
  const footerY = pageHeight - 20;
  pdf.setFillColor(240, 249, 255);
  pdf.rect(0, footerY - 10, pageWidth, 30, 'F');
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(100, 100, 100);
  pdf.text('Generated by RainWise - Smart Water Management Platform', margin, footerY);
  pdf.text(`Report Date: ${new Date().toLocaleDateString()} | Location: ${data.location}`, margin, footerY + 5);

  // Save the PDF
  pdf.save(`RainWise_Assessment_${data.location.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};