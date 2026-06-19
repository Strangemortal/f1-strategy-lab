# Software Requirements Specification (SRS)

# 1. Introduction

## 1.1 Purpose

F1 Strategy Lab is an open-source Formula 1 analytics platform designed to transform race telemetry into meaningful performance insights and strategic recommendations.

The platform enables users to analyze driver performance, compare telemetry, visualize track data, evaluate race strategies, and generate pit stop recommendations through an interactive dashboard.

---

## 1.2 Scope

The system provides:

- Race Information Retrieval
- Driver Telemetry Analysis
- Track Visualization
- Speed Heatmaps
- Driver Comparison
- Lap Delta Analysis
- Strategy Evaluation
- Recommendation Generation

The platform currently focuses on historical Formula 1 session data available through FastF1.

Future releases will introduce race search, simulation capabilities, predictive analytics, and AI-assisted strategy support.

---

## 1.3 Intended Audience

This document is intended for:

- Developers
- Contributors
- Project Maintainers
- Motorsport Enthusiasts
- Students and Researchers

---

# 2. System Overview

F1 Strategy Lab consists of three major subsystems:

- Frontend Dashboard (Next.js)
- Backend API (FastAPI)
- Analytics Engine (FastF1 Integration)

Users interact with a web-based dashboard that communicates with backend analytical services. The backend retrieves and processes Formula 1 data before returning visualizations and strategic insights.

---

# 3. Analytical Workflow

![Analysis Workflow Diagram](./diagrams/Analysis%20Workflow%20Diagram.png)

The analytical workflow demonstrates how raw race information is progressively transformed into actionable racing intelligence.

The process begins with race data acquisition and proceeds through telemetry analysis, track mapping, strategy evaluation, and stint analysis before generating recommendations for the user.

---

# 4. Functional Requirements

## FR-01 Race Information Retrieval

The system shall provide race metadata including:

- Event Name
- Location
- Country
- Season
- Driver List

---

## FR-02 Driver Telemetry Analysis

The system shall provide telemetry metrics for a selected driver.

Supported metrics include:

- Speed
- Throttle
- Brake
- RPM
- Gear
- DRS

---

## FR-03 Driver Comparison

The system shall allow users to compare telemetry data between two drivers.

---

## FR-04 Track Visualization

The system shall visualize a driver's fastest lap using positional telemetry data.

---

## FR-05 Speed Heatmap Visualization

The system shall display speed intensity throughout the circuit using color-coded track segments.

---

## FR-06 Lap Delta Analysis

The system shall calculate and visualize performance differences between two drivers.

---

## FR-07 Strategy Analysis

The system shall display tyre compounds, pit stops, and race stints for a selected driver.

---

## FR-08 Recommendation Generation

The system shall generate pit strategy recommendations based on available race and strategy data.

---

# 5. Non-Functional Requirements

## Performance

- API responses should typically complete within five seconds.
- Cached requests should complete within two seconds.

## Reliability

The platform shall provide consistent analytical results for supported race sessions.

## Maintainability

The project shall follow a modular architecture with clearly separated frontend and backend responsibilities.

## Usability

Users should be able to perform analysis without requiring prior FastF1 knowledge.

## Scalability

New analytical modules should be integrated without major architectural modifications.

## Open Source Compliance

The project shall remain distributed under the GNU Affero General Public License v3.0 (AGPL-3.0).

---

# 6. System Constraints

## Technical Constraints

- Python 3.12+
- FastAPI
- FastF1
- Next.js
- React
- TypeScript
- Plotly

## Data Constraints

Historical race analytics depend on data availability through FastF1-supported sessions.

---

# 7. Assumptions

The system assumes:

- Formula 1 telemetry data is available through FastF1.
- Internet access is available when uncached data is requested.
- Users access the platform through modern web browsers.

---

# 8. Future Scope

Planned enhancements include:

- Dynamic Race Search
- Multi-Race Comparison
- Sector Analysis
- Driver Performance Scoring
- Pit Window Prediction
- Tyre Degradation Modeling
- Strategy Simulation Engine
- Race Replay Analytics
- AI Strategy Assistant

---

# 9. Success Criteria

The project is considered successful when users can:

- Load supported Formula 1 race sessions
- Compare driver performance
- Visualize telemetry and track data
- Analyze tyre and stint strategies
- Generate actionable strategy recommendations

Additionally, contributors should be able to extend analytical functionality without major architectural changes.

---

# 10. Summary

F1 Strategy Lab is a telemetry-driven analytics platform that combines Formula 1 race data, interactive visualization, and strategic evaluation into a unified analytical environment.

The system is designed to support both current race analysis capabilities and future expansion toward advanced race engineering and decision-support tooling.
