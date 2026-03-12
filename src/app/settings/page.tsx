'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database,
  Smartphone,
  Mail,
  Moon,
  Sun,
  User,
  Globe,
  Zap
} from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    critical: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    units: 'metric',
    language: 'en',
    autoRefresh: true
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Configure your CropIQ dashboard preferences and system settings
                </p>
              </div>

              {/* Notification Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notification Preferences
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Receive alerts via email</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, email: !notifications.email})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.email 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.email ? 'translate-x-2' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">SMS Alerts</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Critical alerts via SMS</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.sms 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.sms ? 'translate-x-2' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Push Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Mobile app alerts</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, push: !notifications.push})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.push 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.push ? 'translate-x-2' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Critical Only</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Only critical alerts</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, critical: !notifications.critical})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.critical 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        notifications.critical ? 'translate-x-2' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Display Preferences */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Sun className="h-6 w-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Display Preferences
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Moon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Theme</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Light or dark mode</div>
                      </div>
                    </div>
                    <select 
                      value={preferences.theme}
                      onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Units</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Measurement units</div>
                      </div>
                    </div>
                    <select 
                      value={preferences.units}
                      onChange={(e) => setPreferences({...preferences, units: e.target.value})}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="metric">Metric</option>
                      <option value="imperial">Imperial</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Auto Refresh</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Update data automatically</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, autoRefresh: !preferences.autoRefresh})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.autoRefresh 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.autoRefresh ? 'translate-x-2' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <SettingsIcon className="h-6 w-6 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    System Settings
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Data Source</h4>
                      <span className="text-sm text-blue-600 dark:text-blue-400">Connected</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Firebase Realtime Database
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Update Frequency</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Every 5 minutes</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Automatic sensor data refresh interval
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Data Retention</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">30 days</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Historical data storage period
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">API Version</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">v2.1.0</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      CropIQ sensor integration API
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-6 w-6 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Account Settings
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Account Type</h4>
                      <span className="text-sm text-green-600 dark:text-green-400">Premium</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Full access to all CropIQ features
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">Field Locations</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">3 fields</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Managed agricultural locations
                    </p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
