'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { BarChart3, TrendingUp, Activity, Droplets, Thermometer } from 'lucide-react';
import { getHistoricalData, getLatestSoilData, getLatestAirData } from '@/data/mockData';

export default function Analytics() {
  const historicalData = getHistoricalData(24);
  const latestSoil = getLatestSoilData();
  const latestAir = getLatestAirData();

  // Calculate averages for the period
  const avgMoisture = historicalData.soil.reduce((sum, d) => sum + d.moisture_pct, 0) / historicalData.soil.length;
  const avgTemp = historicalData.soil.reduce((sum, d) => sum + d.temperature_c, 0) / historicalData.soil.length;
  const avgPH = historicalData.soil.reduce((sum, d) => sum + d.pH, 0) / historicalData.soil.length;
  const avgNitrogen = historicalData.soil.reduce((sum, d) => sum + d.nitrogen_mgkg, 0) / historicalData.soil.length;
  const avgPhosphorus = historicalData.soil.reduce((sum, d) => sum + d.phosphorus_mgkg, 0) / historicalData.soil.length;
  const avgPotassium = historicalData.soil.reduce((sum, d) => sum + d.potassium_mgkg, 0) / historicalData.soil.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Advanced analytics and reporting for your soil health monitoring system
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Activity className="h-4 w-4" />
                  <span>Last 24 hours</span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Moisture</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {avgMoisture.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Current: {latestSoil.moisture_pct.toFixed(2)}%
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Temperature</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {avgTemp.toFixed(2)}°C
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Current: {latestSoil.temperature_c.toFixed(2)}°C
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg pH</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {avgPH.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Current: {latestSoil.pH.toFixed(2)}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Data Points</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {historicalData.soil.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Total readings
                  </div>
                </div>
              </div>

              {/* Nutrient Averages */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  24-Hour Nutrient Averages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Nitrogen</div>
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {avgNitrogen.toFixed(2)}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">mg/kg</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Phosphorus</div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {avgPhosphorus.toFixed(2)}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">mg/kg</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">Potassium</div>
                    <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                      {avgPotassium.toFixed(2)}
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">mg/kg</div>
                  </div>
                </div>
              </div>

              {/* Additional Analytics Content */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Detailed Analytics
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <p className="mb-4">
                    Advanced analytics features including historical trends, correlation analysis, and predictive modeling are currently in development.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Historical trend analysis with custom date ranges</li>
                    <li>Correlation matrices between different soil parameters</li>
                    <li>Seasonal pattern recognition</li>
                    <li>Export functionality for data analysis</li>
                    <li>Custom alert thresholds and notifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
