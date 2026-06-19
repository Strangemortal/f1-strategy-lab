# F1 Strategy Lab Frontend

The frontend provides an interactive dashboard for exploring Formula 1 telemetry, track visualizations, strategy insights, and driver comparisons.

---

# Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Plotly.js

---

# Local Development

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Running the Frontend

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# Backend Requirement

The frontend expects the FastAPI backend to be running locally.

Default backend URL:

```text
http://localhost:8000
```

Ensure the backend server is running before opening the dashboard.

---

# Project Structure

```text
frontend/
│
├── app/
│
├── components/
│
├── lib/
│
├── public/
│
└── package.json
```

---

# Core Components

- DriverSelector
- MetricSelector
- TelemetryChart
- TrackMap
- LapDeltaChart
- StrategyCard

---

# Features

- Race Information Display
- Driver Comparison
- Telemetry Visualization
- Speed Heatmaps
- Lap Delta Analysis
- Strategy Analysis
- Recommendation Display

---

# Development Workflow

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

# Notes

The frontend communicates with the backend through helper functions located in:

```text
lib/api.ts
```

All API requests should be centralized through this module to maintain consistency across the application.
