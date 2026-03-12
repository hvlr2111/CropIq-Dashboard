'use client';

import { 
  LayoutDashboard, 
  BarChart3, 
  AlertTriangle, 
  Settings,
  Leaf,
  Droplets,
  Thermometer,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLatestSoilData, getLatestAirData } from '@/data/mockData';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // Get real data for quick stats
  const latestSoilData = getLatestSoilData();
  const latestAirData = getLatestAirData();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      {/* Sidebar */}
      <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              CropIQ
            </span>
          </div>
        </div>
        
        <div className="mt-8 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">Moisture</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{latestSoilData.moisture_pct.toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-300">Temperature</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{latestAirData.temperature_c.toFixed(2)}°C</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">pH Level</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{latestSoilData.pH.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
