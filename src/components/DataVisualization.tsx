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
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toFixed(1)}{entry.dataKey === 'pH' ? '' : entry.dataKey === 'ec' ? ' mS/cm' : entry.dataKey.includes('temp') ? '°C' : entry.dataKey.includes('moisture') ? '%' : ' mg/kg'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Nutrient Depletion Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
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
