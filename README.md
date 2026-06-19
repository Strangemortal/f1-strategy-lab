# F1 Strategy Lab

F1 Strategy Lab is an open-source Formula 1 analytics platform designed to transform race telemetry into meaningful performance insights and strategic recommendations.

The platform combines telemetry visualization, driver comparison, track analysis, and strategy evaluation into a unified analytical dashboard built on real Formula 1 data.

---

# Features

## Race Information

Retrieve race metadata including:

- Event Information
- Circuit Location
- Driver Lineup
- Season Data

## Telemetry Analysis

Compare driver telemetry using interactive visualizations.

Supported metrics:

- Speed
- Throttle
- Brake
- RPM
- Gear
- DRS

## Track Visualization

Visualize a driver's fastest lap using positional telemetry data.

Features include:

- Circuit Rendering
- Track Mapping
- Speed-Based Heatmaps

## Lap Delta Analysis

Compare driver performance throughout a lap and identify gains and losses across the circuit.

## Strategy Analysis

Analyze tyre compounds, pit stops, and race stints.

## Strategy Recommendations

Generate pit stop recommendations based on current tyre usage and race conditions.

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Plotly.js

## Backend

- Python
- FastAPI
- FastF1

## Data Source

- FastF1
- Official Formula 1 Timing Data

---

# Project Structure

```text
f1-strategy-lab/
│
├── backend/
├── frontend/
├── data/
├── docs/
│
├── README.md
├── LICENSE
└── .gitignore
```

---

# Getting Started

## Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

# Documentation

Detailed project documentation is available in the `docs/` directory.

Available documents:

- Software Requirements Specification (SRS)
- Use Cases
- Domain Model
- System Architecture
- API Reference
- Team Onboarding Guide

Supporting diagrams include:

- Use Case Diagram
- Domain Model Diagram
- Architecture Diagram
- Analysis Workflow Diagram

---

# Roadmap

## Current

- Race Information Retrieval
- Telemetry Analysis
- Track Visualization
- Speed Heatmaps
- Lap Delta Analysis
- Strategy Analysis
- Recommendation Engine

## Planned

- Dynamic Race Search
- Multi-Race Comparison
- Sector Analysis
- Pit Window Prediction
- Strategy Simulation Engine
- AI-Assisted Strategy Analysis

---

# Contributing

Contributions are welcome.

Areas of contribution include:

- Frontend Development
- Backend Development
- Data Visualization
- Strategy Analytics
- Documentation

Please refer to:

```text
docs/TEAM_ONBOARDING.md
```

before contributing.

---

# License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

See the LICENSE file for details.

---

# Vision

The long-term goal of F1 Strategy Lab is to evolve into a complete race engineering and strategy analysis platform capable of supporting telemetry exploration, strategy simulation, predictive analytics, and advanced decision-support tooling for Formula 1 enthusiasts, students, researchers, and developers.
