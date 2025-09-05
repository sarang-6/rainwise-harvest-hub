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

// Mock rainfall data for different locations
const getRainfallData = (location: string): number => {
  const rainfallData: { [key: string]: number } = {
    'mumbai': 2400,
    'delhi': 790,
    'bangalore': 970,
    'chennai': 1400,
    'kolkata': 1580,
    'hyderabad': 810,
    'pune': 760,
    'ahmedabad': 800,
    'jaipur': 650,
    'lucknow': 980,
    'kanpur': 820,
    'nagpur': 1170,
    'indore': 1050,
    'thane': 2400,
    'bhopal': 1150,
    'visakhapatnam': 1100,
    'patna': 1200,
    'vadodara': 900,
    'ghaziabad': 790,
    'ludhiana': 780
  };

  const key = location.toLowerCase().split(',')[0].trim();
  return rainfallData[key] || 1000; // Default average rainfall
};

// Mock aquifer depth data
const getAquiferDepth = (location: string): number => {
  const aquiferData: { [key: string]: number } = {
    'mumbai': 15,
    'delhi': 25,
    'bangalore': 35,
    'chennai': 8,
    'kolkata': 12,
    'hyderabad': 45,
    'pune': 20,
    'ahmedabad': 50,
    'jaipur': 60,
    'lucknow': 18,
    'kanpur': 22,
    'nagpur': 30,
    'indore': 25,
    'thane': 15,
    'bhopal': 40,
    'visakhapatnam': 10,
    'patna': 14,
    'vadodara': 35,
    'ghaziabad': 25,
    'ludhiana': 28
  };

  const key = location.toLowerCase().split(',')[0].trim();
  return aquiferData[key] || 25; // Default depth
};

// Calculate rainwater harvesting potential
export const calculateRainwaterPotential = (data: AssessmentData): AssessmentResults => {
  const rainfall = getRainfallData(data.location);
  const aquiferDepth = getAquiferDepth(data.location);
  
  // Calculate harvested water potential
  // Formula: Roof Area (m²) × Rainfall (mm) × Runoff coefficient (0.85) = Liters/year
  const runoffCoefficient = 0.85;
  const harvestedWater = Math.round(data.roofArea * rainfall * runoffCoefficient);
  
  // Determine structure type based on open space and other factors
  let structureType = 'Pit';
  if (data.openSpace < 20) {
    structureType = 'Tank';
  } else if (data.openSpace > 100) {
    structureType = 'Trench';
  }
  
  // Calculate dimensions based on harvested water and structure type
  let dimensions = { length: 0, width: 0, depth: 0 };
  
  const volumeNeeded = harvestedWater / 1000; // Convert to cubic meters
  
  switch (structureType.toLowerCase()) {
    case 'pit':
      // Circular pit - convert to rectangular approximation
      const pitRadius = Math.sqrt(volumeNeeded / (Math.PI * 2)); // 2m depth
      dimensions = {
        length: Math.round(pitRadius * 2 * 10) / 10,
        width: Math.round(pitRadius * 2 * 10) / 10,
        depth: 2.0
      };
      break;
    case 'trench':
      // Long trench
      dimensions = {
        length: Math.round(Math.sqrt(volumeNeeded * 8) * 10) / 10, // 8:1 ratio
        width: Math.round(Math.sqrt(volumeNeeded / 8) * 10) / 10,
        depth: 1.5
      };
      break;
    case 'tank':
      // Rectangular tank
      dimensions = {
        length: Math.round(Math.sqrt(volumeNeeded * 1.5) * 10) / 10,
        width: Math.round(Math.sqrt(volumeNeeded / 1.5) * 10) / 10,
        depth: 2.5
      };
      break;
  }
  
  // Ensure minimum dimensions
  dimensions.length = Math.max(dimensions.length, 2);
  dimensions.width = Math.max(dimensions.width, 2);
  dimensions.depth = Math.max(dimensions.depth, 1);
  
  // Calculate estimated cost
  // Base cost formula: Roof area × ₹50 + Structure complexity factor
  const baseCost = data.roofArea * 50;
  const structureMultiplier = structureType === 'Tank' ? 1.5 : structureType === 'Trench' ? 1.2 : 1.0;
  const estimatedCost = Math.round(baseCost * structureMultiplier);
  
  // Calculate water savings and financial benefits
  const dailyWaterNeed = data.dwellers * data.waterUsage;
  const monthlyWaterNeed = dailyWaterNeed * 30;
  const waterSaved = Math.min(harvestedWater / 12, monthlyWaterNeed); // Monthly savings
  
  // Assume ₹4 per liter for municipal water
  const monthlySavings = Math.round(waterSaved * 4);
  
  // Calculate payback period
  const annualSavings = monthlySavings * 12;
  const paybackPeriod = Math.round((estimatedCost / annualSavings) * 10) / 10;
  
  return {
    harvestedWater,
    structureType,
    dimensions,
    estimatedCost,
    rainfall,
    aquiferDepth,
    paybackPeriod: Math.max(paybackPeriod, 0.5), // Minimum 6 months
    waterSaved: Math.round(waterSaved),
    monthlySavings
  };
};

// Generate PDF content
export const generatePDFContent = (data: AssessmentData, results: AssessmentResults) => {
  return {
    title: 'Rainwater Harvesting Assessment Report',
    subtitle: `Generated for ${data.location}`,
    sections: [
      {
        title: 'Property Information',
        content: [
          `Location: ${data.location}`,
          `Building Type: ${data.buildingType}`,
          `Roof Area: ${data.roofArea} sq. meters`,
          `Number of Occupants: ${data.dwellers}`,
          `Available Open Space: ${data.openSpace} sq. meters`,
          `Daily Water Usage: ${data.waterUsage} liters per person`
        ]
      },
      {
        title: 'Assessment Results',
        content: [
          `Annual Harvesting Potential: ${results.harvestedWater.toLocaleString()} liters`,
          `Recommended Structure: ${results.structureType}`,
          `Structure Dimensions: ${results.dimensions.length}m × ${results.dimensions.width}m × ${results.dimensions.depth}m`,
          `Estimated Implementation Cost: ₹${results.estimatedCost.toLocaleString()}`,
          `Expected Payback Period: ${results.paybackPeriod} years`
        ]
      },
      {
        title: 'Local Conditions',
        content: [
          `Annual Rainfall: ${results.rainfall}mm`,
          `Aquifer Depth: ${results.aquiferDepth}m`,
          `Monthly Water Savings: ${results.waterSaved.toLocaleString()} liters`,
          `Monthly Bill Savings: ₹${results.monthlySavings.toLocaleString()}`
        ]
      },
      {
        title: 'Recommendations',
        content: [
          '• Install first flush diverter to improve water quality',
          '• Use mesh filters to prevent debris accumulation',
          '• Regular maintenance every 6 months recommended',
          '• Consider connecting to existing plumbing for optimal use',
          '• Monitor groundwater levels annually'
        ]
      }
    ]
  };
};