'use client';

import { 
  Droplets, 
  Thermometer, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Leaf
} from 'lucide-react';
import { getLatestSoilData, getLatestAirData, getHistoricalData } from '@/data/mockData';

interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  status?: 'optimal' | 'warning' | 'critical';
  className?: string;
}

function KPICard({ title, value, unit, icon, trend, status, className }: KPICardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700';
      case 'critical':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
            {icon}
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </h3>
        </div>
        {status && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
            {status}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {unit}
        </span>
      </div>
      
      {trend && (
        <div className="flex items-center mt-3 space-x-1">
          {trend.direction === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ${trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend.value}% {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}

interface NPKStatus {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface SoilHealth {
  moisture: number;
  pH: number;
  ec: number;
}

interface Climate {
  soilTemp: number;
  airTemp: number;
  airHumidity: number;
}

export default function LiveSensorCards() {
  // Get real data from mock database
  const latestSoilData = getLatestSoilData();
  const latestAirData = getLatestAirData();
  const historicalData = getHistoricalData(24);
  
  // Calculate trends (compare current with 24 hours ago)
  const calculateTrend = (current: number, previous: number): { value: number; direction: 'up' | 'down' } => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change * 10) / 10),
      direction: change >= 0 ? 'up' : 'down'
    };
  };
  
  const npkTrend = calculateTrend(
    latestSoilData.nitrogen_mgkg + latestSoilData.phosphorus_mgkg + latestSoilData.potassium_mgkg,
    historicalData.soil[0].nitrogen_mgkg + historicalData.soil[0].phosphorus_mgkg + historicalData.soil[0].potassium_mgkg
  );
  
  const moistureTrend = calculateTrend(latestSoilData.moisture_pct, historicalData.soil[0].moisture_pct);
  const tempTrend = calculateTrend(latestAirData.temperature_c, historicalData.air[0].temperature_c);

  const npkData: NPKStatus = {
    nitrogen: latestSoilData.nitrogen_mgkg,
    phosphorus: latestSoilData.phosphorus_mgkg,
    potassium: latestSoilData.potassium_mgkg
  };

  const soilHealthData: SoilHealth = {
    moisture: latestSoilData.moisture_pct,
    pH: latestSoilData.pH,
    ec: latestSoilData.ec_mscm
  };

  const climateData: Climate = {
    soilTemp: latestSoilData.temperature_c,
    airTemp: latestAirData.temperature_c,
    airHumidity: latestAirData.humidity_pct
  };

  const getNPKStatus = (value: number, type: 'N' | 'P' | 'K'): 'optimal' | 'warning' | 'critical' => {
    const ranges = {
      N: { optimal: [40, 60], warning: [20, 40] },
      P: { optimal: [30, 50], warning: [15, 30] },
      K: { optimal: [80, 120], warning: [40, 80] }
    };
    
    const range = ranges[type];
    if (value >= range.optimal[0] && value <= range.optimal[1]) return 'optimal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  const getSoilStatus = (type: 'moisture' | 'pH' | 'ec', value: number): 'optimal' | 'warning' | 'critical' => {
    const ranges = {
      moisture: { optimal: [20, 40], warning: [10, 20] },
      pH: { optimal: [6.0, 7.0], warning: [5.5, 6.0] },
      ec: { optimal: [0.2, 0.8], warning: [0.1, 0.2] }
    };
    
    const range = ranges[type];
    if (value >= range.optimal[0] && value <= range.optimal[1]) return 'optimal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* NPK Status Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl shadow-lg border border-emerald-200 dark:border-emerald-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-emerald-500 rounded-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              NPK Status
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Nutrient Levels
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                getNPKStatus(npkData.nitrogen, 'N') === 'optimal' ? 'bg-green-500' :
                getNPKStatus(npkData.nitrogen, 'N') === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nitrogen</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {npkData.nitrogen.toFixed(2)} <span className="text-sm text-gray-500">mg/kg</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                getNPKStatus(npkData.phosphorus, 'P') === 'optimal' ? 'bg-green-500' :
                getNPKStatus(npkData.phosphorus, 'P') === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phosphorus</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {npkData.phosphorus.toFixed(2)} <span className="text-sm text-gray-500">mg/kg</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                getNPKStatus(npkData.potassium, 'K') === 'optimal' ? 'bg-green-500' :
                getNPKStatus(npkData.potassium, 'K') === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potassium</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {npkData.potassium.toFixed(2)} <span className="text-sm text-gray-500">mg/kg</span>
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center space-x-1">
            {npkTrend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm ${npkTrend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {npkTrend.direction === 'up' ? '+' : '-'}{npkTrend.value}% from yesterday
            </span>
          </div>
        </div>
      </div>

      {/* Soil Health Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl shadow-lg border border-amber-200 dark:border-amber-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-amber-500 rounded-lg">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Soil Health
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Core Metrics
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Moisture</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {soilHealthData.moisture.toFixed(2)} <span className="text-sm text-gray-500">%</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">pH Level</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {soilHealthData.pH.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">EC</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {soilHealthData.ec.toFixed(2)} <span className="text-sm text-gray-500">mS/cm</span>
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-700">
          <div className="flex items-center space-x-1">
            {moistureTrend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm ${moistureTrend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {moistureTrend.direction === 'up' ? '+' : '-'}{moistureTrend.value}% from yesterday
            </span>
          </div>
        </div>
      </div>

      {/* Climate Card */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-500 rounded-lg">
            <Thermometer className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Climate
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Temperature & Humidity
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Soil Temp</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {climateData.soilTemp.toFixed(2)} <span className="text-sm text-gray-500">°C</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Air Temp</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {climateData.airTemp.toFixed(2)} <span className="text-sm text-gray-500">°C</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Air Humidity</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {climateData.airHumidity.toFixed(2)} <span className="text-sm text-gray-500">%</span>
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-1">
            {tempTrend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm ${tempTrend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {tempTrend.direction === 'up' ? '+' : '-'}{tempTrend.value}°C from yesterday
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
