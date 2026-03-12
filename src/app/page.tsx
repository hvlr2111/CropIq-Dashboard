import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LiveSensorCards from '@/components/LiveSensorCards';
import PredictiveAnalytics from '@/components/PredictiveAnalytics';
import DataVisualization from '@/components/DataVisualization';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Live Sensor KPI Cards */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Live Sensor Readings
                </h2>
                <LiveSensorCards />
              </section>

              {/* Predictive Analytics */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Predictive Analytics
                </h2>
                <PredictiveAnalytics />
              </section>

              {/* Data Visualization */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Data Visualization
                </h2>
                <DataVisualization />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
