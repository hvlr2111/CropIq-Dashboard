'use client';

import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Activity,
  Droplets,
  Zap,
  Info
} from 'lucide-react';
import { getPredictiveAnalytics } from '@/data/analytics';

export default function PredictiveAnalytics() {
  const analytics = getPredictiveAnalytics();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-blue-500';
      case 'Safe':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-50/50 dark:bg-red-900/10 border-red-200/50 dark:border-red-700/50 hover:shadow-red-500/20';
      case 'High':
        return 'bg-orange-50/50 dark:bg-orange-900/10 border-orange-200/50 dark:border-orange-700/50 hover:shadow-orange-500/20';
      case 'Medium':
        return 'bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-yellow-500/20';
      case 'Low':
        return 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-700/50 hover:shadow-blue-500/20';
      case 'Safe':
        return 'bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-700/50 hover:shadow-green-500/20';
      default:
        return 'bg-gray-50/50 dark:bg-gray-900/10 border-gray-200/50 dark:border-gray-700/50 hover:shadow-gray-500/20';
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-red-700 dark:text-red-200';
      case 'High':
        return 'text-orange-700 dark:text-orange-200';
      case 'Medium':
        return 'text-yellow-700 dark:text-yellow-200';
      case 'Low':
        return 'text-blue-700 dark:text-blue-200';
      case 'Safe':
        return 'text-green-700 dark:text-green-200';
      default:
        return 'text-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Waterlogging Risk Engine */}
      <div className={`group relative backdrop-blur-md rounded-xl shadow-lg border p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${getRiskBgColor(analytics.waterloggingRisk.level)}`}>
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-800/40 -z-10" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl shadow-inner text-white group-hover:scale-110 transition-transform duration-300 ${getRiskColor(analytics.waterloggingRisk.level)}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Waterlogging Risk Engine
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time flood prevention analysis
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskTextColor(analytics.waterloggingRisk.level)}`}>
              {analytics.waterloggingRisk.level}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Risk Level
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Time to Event
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analytics.waterloggingRisk.timeToEvent}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Risk Score
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getRiskColor(analytics.waterloggingRisk.level)}`}
                      style={{ width: `${analytics.waterloggingRisk.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {analytics.waterloggingRisk.score}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  System Action
                </div>
                <div className={`text-sm font-medium ${getRiskTextColor(analytics.waterloggingRisk.level)}`}>
                  {analytics.waterloggingRisk.action}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NPK Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Prediction */}
        <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg border border-purple-200/50 dark:border-purple-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10 -z-10" />
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl shadow-inner text-white group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                7-Day NPK Prediction
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Short-term nutrient forecast
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nitrogen</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {analytics.npk7DayPrediction.nitrogen.toFixed(2)} mg/kg
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.npk7DayPrediction.confidence}% confidence
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phosphorus</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {analytics.npk7DayPrediction.phosphorus.toFixed(2)} mg/kg
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.npk7DayPrediction.confidence}% confidence
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potassium</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {analytics.npk7DayPrediction.potassium.toFixed(2)} mg/kg
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.npk7DayPrediction.confidence}% confidence
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Overall Trend</span>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                Stable
              </span>
            </div>
          </div>
        </div>

        {/* 14-Day Prediction */}
        <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg border border-cyan-200/50 dark:border-cyan-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-900/10 dark:to-teal-900/10 -z-10" />
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-xl shadow-inner text-white group-hover:scale-110 transition-transform duration-300">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                14-Day NPK Prediction
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Long-term nutrient planning
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nitrogen</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {analytics.npk14DayPrediction.nitrogen.toFixed(2)} mg/kg
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.npk14DayPrediction.confidence}% confidence
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phosphorus</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {analytics.npk14DayPrediction.phosphorus.toFixed(2)} mg/kg
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.npk14DayPrediction.confidence}% confidence
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potassium</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {analytics.npk14DayPrediction.potassium.toFixed(2)} mg/kg
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {analytics.npk14DayPrediction.confidence}% confidence
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-cyan-200 dark:border-cyan-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Recommended Action</span>
              <span className="font-medium text-cyan-600 dark:text-cyan-400">
                Monitor nutrients
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
