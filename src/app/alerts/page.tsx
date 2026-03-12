'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { 
  AlertTriangle, 
  Bell, 
  Shield, 
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle as AlertIcon
} from 'lucide-react';
import { getLatestSoilData } from '@/data/mockData';
import { getPredictiveAnalytics } from '@/data/analytics';

export default function Alerts() {
  const latestSoil = getLatestSoilData();
  const analytics = getPredictiveAnalytics();

  // Mock alert data
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Nitrogen Levels',
      message: `Current nitrogen level (${latestSoil.nitrogen_mgkg.toFixed(2)} mg/kg) is below optimal range for current crop stage.`,
      time: '2 hours ago',
      acknowledged: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Moisture Trend Alert',
      message: 'Soil moisture has been decreasing by 3% over the last 6 hours.',
      time: '4 hours ago',
      acknowledged: true
    },
    {
      id: 3,
      type: 'critical',
      title: 'Waterlogging Risk Elevated',
      message: analytics.waterloggingRisk.action,
      time: '30 minutes ago',
      acknowledged: false
    },
    {
      id: 4,
      type: 'success',
      title: 'System Update',
      message: 'Predictive models have been recalibrated with latest sensor data.',
      time: '1 day ago',
      acknowledged: true
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'High':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    }
  };

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
                    Alerts
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    System notifications and alerts for your soil health monitoring
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Bell className="h-4 w-4" />
                  <span>{alerts.filter(a => !a.acknowledged).length} active</span>
                </div>
              </div>

              {/* Current Risk Status */}
              <div className={`rounded-xl shadow-lg border-2 p-6 ${getRiskLevelColor(analytics.waterloggingRisk.level)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Current Risk Level
                      </h3>
                      <p className="text-sm opacity-75">
                        Waterlogging Assessment
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {analytics.waterloggingRisk.level}
                    </div>
                    <div className="text-sm opacity-75">
                      Score: {analytics.waterloggingRisk.score}%
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mb-2">
                    <strong>Time to Event:</strong> {analytics.waterloggingRisk.timeToEvent}
                  </p>
                  <p>
                    <strong>Recommended Action:</strong> {analytics.waterloggingRisk.action}
                  </p>
                </div>
              </div>

              {/* Active Alerts */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Active Alerts
                </h3>
                <div className="space-y-4">
                  {alerts.filter(alert => !alert.acknowledged).map(alert => (
                    <div key={alert.id} className={`rounded-lg border p-4 ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {alert.title}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {alert.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {alerts.filter(alert => !alert.acknowledged).length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-300">
                        No active alerts at this time.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Alert History */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Alert History
                </h3>
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className={`text-sm font-medium ${alert.acknowledged ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {alert.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {alert.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {alert.acknowledged && (
                          <span className="text-xs text-green-600 dark:text-green-400">Acknowledged</span>
                        )}
                        {!alert.acknowledged && (
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Alert Preferences
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <p className="mb-4">
                    Configure how and when you receive alerts from the monitoring system.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Email notifications for critical alerts</li>
                    <li>SMS alerts for waterlogging risks</li>
                    <li>Mobile push notifications</li>
                    <li>Custom threshold configuration</li>
                    <li>Alert scheduling and quiet hours</li>
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
