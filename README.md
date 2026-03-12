# CropIQ - Smart Soil Health Monitoring Dashboard

A modern, responsive KPI dashboard for precision agriculture that uses IoT field sensors and Machine Learning to predict NPK levels and prevent waterlogging risks.

## 🌟 Features

### 📊 Live Sensor Monitoring
- **NPK Status**: Real-time nitrogen, phosphorus, and potassium levels with intuitive Lucide iconography (TestTube, Sparkles, Hexagon)
- **Soil Health**: Live moisture %, pH level, and electrical conductivity (EC) readings
- **Climate Data**: Soil temperature, air temperature, and humidity monitoring
- **Trend Analysis**: Real-time trend indicators showing changes from previous readings

### 🔮 Predictive Analytics
- **Waterlogging Risk Engine**: Advanced risk assessment with 5-level alert system (Safe/Low/Medium/High/Critical)
- **Time-to-Event Predictions**: Countdown to critical saturation events
- **NPK Forecasting**: 7-day and 14-day nutrient predictions with confidence levels
- **Action Recommendations**: System-generated recommendations based on current conditions

### 📈 Data Visualization
- **Nutrient Depletion Charts**: 24-hour historical trends for N, P, K levels
- **Moisture vs Temperature**: Correlation analysis with synchronized charts
- **pH & EC Variance**: Stability tracking with bar and area charts
- **Interactive Tooltips**: Detailed information on hover

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Seamless theme switching utilizing Tailwind's custom dark variant logic
- **Glassmorphism Design**: Sleek, translucent backdrop-blurred cards (`bg-white/40`, `bg-gray-800/40`) with inset gradients
- **Micro-Animations**: Clean hover highlights, icon scaling, and fluid card lift-up transitions
- **Responsive Design**: Optimized for desktop and tablet use in field conditions
- **Agriculture-Inspired Palette**: Emerald greens, earthy tones, and high-contrast alert hues

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with TypeScript and App Router
- **Styling**: Tailwind CSS v4 featuring PostCSS config and custom UI states
- **Charts**: Recharts integrated with dynamic frosted-glass tooltips 
- **Icons**: Lucide React for consistent, scalable iconography
- **Data Structure**: Firebase Realtime Database compatible JSON format

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📊 Data Structure

The dashboard is designed to work with Firebase Realtime Database using the following JSON structure:

```json
{
  "air_data": {
    "history": {
      "reading_0": {
        "humidity_pct": 81.5,
        "temperature_c": 25.5,
        "timestamp": "2026-02-20 00:25:14",
        "date": "2026-02-20"
      }
    }
  },
  "soil_data": {
    "history": {
      "reading_0": {
        "ec_mscm": 0.32,
        "moisture_pct": 14.8,
        "nitrogen_mgkg": 37.6,
        "phosphorus_mgkg": 29.2,
        "potassium_mgkg": 84.0,
        "pH": 4.9,
        "temperature_c": 3.4,
        "timestamp": "2026-02-20 00:25:14",
        "date": "2026-02-20"
      }
    }
  }
}
```

## 🎯 Key Features Explained

### Waterlogging Risk Algorithm
The risk calculation considers:
- **Soil Moisture**: Higher moisture increases risk
- **Electrical Conductivity**: High EC indicates water saturation
- **Temperature**: Low temperatures slow evaporation
- **Randomization**: Adds realistic variation

### NPK Prediction Model
Uses linear trend analysis:
- **Historical Analysis**: Last 6 readings for trend calculation
- **Future Projection**: Extends trends for 7/14 day forecasts
- **Confidence Scoring**: Decreases with prediction distance
- **Minimum Thresholds**: Prevents unrealistic negative values

## 📱 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── analytics/         # Analytics page
│   ├── alerts/           # Alerts page
│   ├── settings/         # Settings page
│   ├── globals.css       # Global styles and Tailwind config
│   ├── layout.tsx        # Root layout with dark mode support
│   └── page.tsx          # Main dashboard page
├── components/            # Reusable React components
│   ├── Header.tsx         # Header with clock and theme toggle
│   ├── Sidebar.tsx       # Navigation sidebar with quick stats
│   ├── LiveSensorCards.tsx # KPI cards for live readings
│   ├── PredictiveAnalytics.tsx # Waterlogging and NPK predictions
│   └── DataVisualization.tsx # Charts and graphs
└── data/                 # Data management and analytics
    ├── mockData.ts       # Mock Firebase data structure
    └── analytics.ts      # Prediction algorithms and calculations
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald green (#10b981) for agriculture theme
- **Secondary**: Blue (#3b82f6) for water/moisture
- **Accent**: Orange/Amber for temperature and warnings
- **Neutral**: Gray scales for text and backgrounds

## 🚧 Future Enhancements

- [ ] Real Firebase integration
- [ ] Mobile-responsive sidebar
- [ ] Historical data export
- [ ] Custom alert thresholds
- [ ] Multi-field support
- [ ] Weather API integration
- [ ] ML model improvements

---

**CropIQ** - Empowering precision agriculture with intelligent soil health monitoring 🌱
