# System Architecture

## 1. Introduction

This document describes the technical architecture of F1 Strategy Lab.

The platform follows a layered architecture that separates user interaction, API communication, analytical processing, and data acquisition. This design promotes modularity, maintainability, and future scalability.

---

# 2. Architecture Diagram

![Architecture Diagram](./diagrams/Architecture%20Diagram.png)

The architecture consists of five primary layers:

- Frontend Layer
- API Layer
- Service Layer
- FastF1 Integration Layer
- Official F1 Data Sources

Each layer is responsible for a specific part of the analytical workflow and communicates through clearly defined interfaces.

---

# 3. Frontend Layer

The frontend is built using Next.js, React, TypeScript, Tailwind CSS, and Plotly.

### Responsibilities

- Driver Selection
- Telemetry Visualization
- Track Visualization
- Lap Delta Analysis
- Strategy Visualization
- Recommendation Display

The frontend provides an interactive environment where users can explore race analytics and compare driver performance.

---

# 4. API Layer

The API layer is implemented using FastAPI.

### Responsibilities

- Request Handling
- Data Validation
- Endpoint Management
- Service Coordination

### Available Endpoints

```text
GET /race/{year}/{grand_prix}

GET /telemetry/{year}/{grand_prix}/{driver}

GET /track/{year}/{grand_prix}/{driver}

GET /delta/{year}/{grand_prix}/{driver_a}/{driver_b}

GET /strategy/{year}/{grand_prix}/{driver}

GET /recommendation/{year}/{grand_prix}/{driver}
```

The API acts as the communication bridge between the frontend and backend analytical services.

---

# 5. Service Layer

The service layer contains the core analytical logic of the platform.

### Services

#### FastF1 Service

Retrieves race metadata and driver information.

#### Telemetry Service

Processes speed, throttle, brake, RPM, gear, and DRS telemetry.

#### Track Service

Generates track coordinates and circuit visualizations.

#### Delta Service

Calculates performance differences between drivers.

#### Strategy Service

Extracts tyre compounds, pit stops, and stint information.

#### Recommendation Service

Generates pit stop and strategy recommendations based on race conditions.

---

# 6. FastF1 Integration Layer

The FastF1 Integration Layer provides access to Formula 1 session data.

### Available Data

- Telemetry Streams
- Lap Information
- Timing Data
- Tyre Compounds
- Positional Coordinates

This layer abstracts data acquisition and preprocessing from the analytical services.

---

# 7. Official F1 Data Sources

The platform relies on official Formula 1 timing and telemetry datasets accessed through FastF1.

These datasets provide:

- Race Information
- Driver Data
- Telemetry Data
- Track Coordinates
- Tyre Information
- Session Timing Data

All analytical insights produced by the platform originate from these data sources.

---

# 8. Data Flow

The platform follows a simple analytical flow:

```text
User
   ↓
Frontend
   ↓
FastAPI
   ↓
Service Layer
   ↓
FastF1 Integration
   ↓
Official F1 Data
   ↓
Processed Analytics
   ↓
Frontend Visualizations
```

This workflow transforms raw Formula 1 telemetry into meaningful visualizations and strategic insights.

---

# 9. Architectural Principles

### Separation of Concerns

Each layer performs a specific responsibility without overlapping functionality.

### Modularity

Analytical features are implemented as independent services.

### Reusability

Frontend components and backend services can be reused across features.

### Extensibility

New analytical modules can be added without affecting existing functionality.

---

# 10. Summary

F1 Strategy Lab uses a layered architecture that combines modern web technologies with Formula 1 telemetry processing.

The architecture enables telemetry analysis, track visualization, lap comparison, strategy evaluation, and recommendation generation while providing a foundation for future expansion into advanced race engineering and strategic decision-support capabilities.
