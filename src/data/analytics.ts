// Import mock data functions
import { getHistoricalData } from './mockData';

export interface WaterloggingRisk {
  level: 'Safe' | 'Low' | 'Medium' | 'High' | 'Critical';
  timeToEvent: string;
  action: string;
  score: number; // 0-100
}

export interface NPKPrediction {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  confidence: number; // 0-100
}

export interface PredictiveAnalytics {
  waterloggingRisk: WaterloggingRisk;
  npk7DayPrediction: NPKPrediction;
  npk14DayPrediction: NPKPrediction;
}

// Calculate waterlogging risk based on current conditions
export const calculateWaterloggingRisk = (soilData: any): WaterloggingRisk => {
  const moisture = soilData.moisture_pct;
  const ec = soilData.ec_mscm;
  const temp = soilData.temperature_c;
  
  // Simple risk calculation algorithm (deterministic)
  let riskScore = 0;
  
  // High moisture increases risk
  if (moisture > 60) riskScore += 40;
  else if (moisture > 40) riskScore += 20;
  else if (moisture > 25) riskScore += 10;
  
  // High EC can indicate water saturation
  if (ec > 0.8) riskScore += 30;
  else if (ec > 0.5) riskScore += 15;
  
  // Low temperature slows evaporation
  if (temp < 10) riskScore += 20;
  else if (temp < 15) riskScore += 10;
  
  // Use fixed seed for consistency instead of Math.random()
  riskScore += 5; // Fixed addition instead of random
  
  let level: WaterloggingRisk['level'];
  let timeToEvent: string;
  let action: string;
  
  if (riskScore >= 80) {
    level = 'Critical';
    timeToEvent = '6-12 hours until saturation';
    action = 'URGENT: Activate drainage systems, halt irrigation';
  } else if (riskScore >= 60) {
    level = 'High';
    timeToEvent = '24-36 hours until critical';
    action = 'Alert: Prepare drainage, reduce irrigation';
  } else if (riskScore >= 40) {
    level = 'Medium';
    timeToEvent = '48-72 hours until risk increases';
    action = 'Monitor: Consider drainage preparation';
  } else if (riskScore >= 20) {
    level = 'Low';
    timeToEvent = '5-7 days until potential risk';
    action = 'Observe: Continue normal monitoring';
  } else {
    level = 'Safe';
    timeToEvent = 'No immediate risk';
    action = 'Normal operations';
  }
  
  return {
    level,
    timeToEvent,
    action,
    score: Math.min(100, Math.round(riskScore))
  };
};

// Predict NPK levels based on current trends
export const predictNPKLevels = (historicalData: any[], days: number): NPKPrediction => {
  if (historicalData.length < 2) {
    return {
      nitrogen: 40,
      phosphorus: 30,
      potassium: 75,
      confidence: 50
    };
  }
  
  // Simple linear trend prediction
  const recent = historicalData.slice(-6); // Last 6 readings
  const avgNitrogen = recent.reduce((sum, d) => sum + d.nitrogen_mgkg, 0) / recent.length;
  const avgPhosphorus = recent.reduce((sum, d) => sum + d.phosphorus_mgkg, 0) / recent.length;
  const avgPotassium = recent.reduce((sum, d) => sum + d.potassium_mgkg, 0) / recent.length;
  
  // Calculate trends
  const nitrogenTrend = (recent[recent.length - 1].nitrogen_mgkg - recent[0].nitrogen_mgkg) / recent.length;
  const phosphorusTrend = (recent[recent.length - 1].phosphorus_mgkg - recent[0].phosphorus_mgkg) / recent.length;
  const potassiumTrend = (recent[recent.length - 1].potassium_mgkg - recent[0].potassium_mgkg) / recent.length;
  
  // Predict future values
  const predictedNitrogen = Math.max(10, avgNitrogen + (nitrogenTrend * days));
  const predictedPhosphorus = Math.max(5, avgPhosphorus + (phosphorusTrend * days));
  const predictedPotassium = Math.max(20, avgPotassium + (potassiumTrend * days));
  
  // Confidence decreases with prediction distance
  const confidence = Math.max(60, 95 - (days * 2.5));
  
  return {
    nitrogen: Math.round(predictedNitrogen * 10) / 10,
    phosphorus: Math.round(predictedPhosphorus * 10) / 10,
    potassium: Math.round(predictedPotassium * 10) / 10,
    confidence: Math.round(confidence)
  };
};

export const getPredictiveAnalytics = (): PredictiveAnalytics => {
  const { soil } = getHistoricalData(24);
  const latestSoil = soil[soil.length - 1];
  
  return {
    waterloggingRisk: calculateWaterloggingRisk(latestSoil),
    npk7DayPrediction: predictNPKLevels(soil, 7),
    npk14DayPrediction: predictNPKLevels(soil, 14)
  };
};
