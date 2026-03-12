export interface AirData {
  humidity_pct: number;
  temperature_c: number;
  timestamp: string;
  date: string;
}

export interface SoilData {
  ec_mscm: number;
  moisture_pct: number;
  nitrogen_mgkg: number;
  phosphorus_mgkg: number;
  potassium_mgkg: number;
  pH: number;
  temperature_c: number;
  timestamp: string;
  date: string;
}

export interface MockDatabase {
  air_data: {
    history: Record<string, AirData>;
  };
  soil_data: {
    history: Record<string, SoilData>;
  };
}

// Generate mock data for the last 24 hours
const generateMockData = (): MockDatabase => {
  const airDataHistory: Record<string, AirData> = {};
  const soilDataHistory: Record<string, SoilData> = {};
  
  const now = new Date();
  
  // Use fixed seed for deterministic generation
  let seed = 12345; // Fixed seed for consistency
  
  const seededRandom = (min: number, max: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    return min + (max - min) * rnd;
  };
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toISOString().replace('T', ' ').substring(0, 19);
    const key = `reading_${i}`;
    
    // Air data with realistic variations
    airDataHistory[key] = {
      humidity_pct: 60 + seededRandom(20, 30) + Math.sin(i / 4) * 10,
      temperature_c: 20 + seededRandom(10, 15) + Math.cos(i / 6) * 5,
      timestamp: timeStr,
      date: dateStr
    };
    
    // Soil data with realistic variations
    soilDataHistory[key] = {
      ec_mscm: 0.2 + seededRandom(0, 0.8) + Math.sin(i / 8) * 0.1,
      moisture_pct: 10 + seededRandom(30, 40) + Math.cos(i / 5) * 15,
      nitrogen_mgkg: 20 + seededRandom(50, 60) + Math.sin(i / 7) * 20,
      phosphorus_mgkg: 15 + seededRandom(40, 45) + Math.cos(i / 9) * 15,
      potassium_mgkg: 50 + seededRandom(90, 100) + Math.sin(i / 6) * 30,
      pH: 5.5 + seededRandom(1, 2) + Math.cos(i / 10) * 0.5,
      temperature_c: 15 + seededRandom(5, 10) + Math.sin(i / 4) * 3,
      timestamp: timeStr,
      date: dateStr
    };
  }
  
  return {
    air_data: {
      history: airDataHistory
    },
    soil_data: {
      history: soilDataHistory
    }
  };
};

export const mockDatabase = generateMockData();

// Helper functions to get latest data
export const getLatestAirData = (): AirData => {
  const readings = Object.values(mockDatabase.air_data.history);
  return readings[readings.length - 1];
};

export const getLatestSoilData = (): SoilData => {
  const readings = Object.values(mockDatabase.soil_data.history);
  return readings[readings.length - 1];
};

export const getHistoricalData = (hours: number = 24) => {
  const airReadings = Object.values(mockDatabase.air_data.history).slice(-hours);
  const soilReadings = Object.values(mockDatabase.soil_data.history).slice(-hours);
  
  return {
    air: airReadings,
    soil: soilReadings
  };
};
