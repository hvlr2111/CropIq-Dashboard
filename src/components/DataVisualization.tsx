'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { getHistoricalData } from '@/data/mockData';

export default function DataVisualization() {
  const { soil } = getHistoricalData(24);

  // Format data for charts
  const chartData = soil.map((reading, index) => ({
    time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    hour: index,
    nitrogen: reading.nitrogen_mgkg,
    phosphorus: reading.phosphorus_mgkg,
    potassium: reading.potassium_mgkg,
    moisture: reading.moisture_pct,
    temperature: reading.temperature_c,
    pH: reading.pH,
    ec: reading.ec_mscm
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <p className="text-sm font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200/50 dark:border-gray-700/50">
            {label}
          </p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <span className="text-sm font-medium" style={{ color: entry.color }}>
                  {entry.name}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {entry.value?.toFixed(1)}{entry.dataKey === 'pH' ? '' : entry.dataKey === 'ec' ? ' mS/cm' : entry.dataKey.includes('temp') ? '°C' : entry.dataKey.includes('moisture') ? '%' : ' mg/kg'}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Nutrient Depletion Chart */}
      <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300/50 dark:hover:border-gray-600/50 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/10 dark:to-gray-800/10 -z-10" />
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Nutrient Depletion Trends
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            24-hour NPK levels monitoring
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="nitrogen" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
              name="Nitrogen"
            />
            <Line 
              type="monotone" 
              dataKey="phosphorus" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              name="Phosphorus"
            />
            <Line 
              type="monotone" 
              dataKey="potassium" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={false}
              name="Potassium"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Moisture vs Temperature Chart */}
        <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300/50 dark:hover:border-gray-600/50 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/10 dark:to-gray-800/10 -z-10" />
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Moisture vs Temperature
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Soil moisture and temperature correlation
            </p>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="moisture" 
                stroke="#06b6d4" 
                fill="#06b6d4"
                fillOpacity={0.3}
                name="Moisture (%)"
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
                name="Temperature (°C)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* pH & EC Variance Chart */}
        <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300/50 dark:hover:border-gray-600/50 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/10 dark:to-gray-800/10 -z-10" />
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              pH & EC Variance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Soil pH and electrical conductivity stability
            </p>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="pH" 
                fill="#8b5cf6"
                name="pH Level"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="ec" 
                fill="#f97316"
                name="EC (mS/cm)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
