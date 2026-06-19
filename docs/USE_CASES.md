# Use Cases

## F1 Strategy Lab

---

# 1. Introduction

This document describes the primary interactions between users and the F1 Strategy Lab platform.

The objective is to define how users interact with race analytics features and how the system supports Formula 1 telemetry analysis.

## Use Case Diagram

![Use Case Diagram](./diagrams/Use%20Case%20Diagram.png)

The diagram provides a high-level overview of the analytical workflow available to users. It illustrates how race information, driver selection, telemetry analysis, track visualization, and strategy evaluation combine to generate actionable racing insights.

---

# 2. Actors

## User

A user is any individual interacting with the platform to analyze Formula 1 race data.

Examples include:

- Motorsport Enthusiasts
- Students
- Developers
- Data Analysts
- Strategy Researchers

---

# 3. Use Cases

## UC-01 View Race Information

**Description**

Retrieve metadata for a selected race.

**Output**

- Event Name
- Location
- Country
- Season
- Participating Drivers

---

## UC-02 Select Drivers

**Description**

Choose drivers for comparative analysis.

**Output**

Selected drivers become active throughout the platform.

---

## UC-03 Compare Telemetry

**Description**

Compare telemetry metrics between two drivers.

**Supported Metrics**

- Speed
- Throttle
- Brake
- RPM
- Gear
- DRS

**Output**

Interactive telemetry comparison charts.

---

## UC-04 View Track Map

**Description**

Visualize a driver's fastest lap on the circuit layout.

**Output**

Track map generated from positional telemetry data.

---

## UC-05 View Speed Heatmap

**Description**

Display speed variations across different sections of the circuit.

**Output**

Color-coded speed heatmap visualization.

---

## UC-06 Analyze Lap Delta

**Description**

Compare lap performance between two drivers.

**Output**

Lap delta chart highlighting relative gains and losses.

---

## UC-07 Analyze Strategy

**Description**

Inspect tyre compounds and race stints.

**Output**

- Tyre Compound
- Start Lap
- End Lap
- Stint Breakdown

---

## UC-08 Get Strategy Recommendation

**Description**

Generate pit stop recommendations based on current strategy data.

**Output**

- Current Compound
- Tyre Life
- Recommended Pit Lap
- Strategic Recommendation

---

# 4. Use Case Dependencies

| Use Case                          | Depends On |
| --------------------------------- | ---------- |
| UC-01 View Race Information       | None       |
| UC-02 Select Drivers              | UC-01      |
| UC-03 Compare Telemetry           | UC-02      |
| UC-04 View Track Map              | UC-02      |
| UC-05 View Speed Heatmap          | UC-04      |
| UC-06 Analyze Lap Delta           | UC-02      |
| UC-07 Analyze Strategy            | UC-02      |
| UC-08 Get Strategy Recommendation | UC-07      |

---

# 5. Future Use Cases

The following capabilities are planned for future releases:

### UC-09 Search Any Race

Dynamic race selection and search.

### UC-10 Compare Multiple Drivers

Analysis of more than two drivers simultaneously.

### UC-11 Sector Analysis

Sector-by-sector performance comparison.

### UC-12 Strategy Simulation

Simulation of alternate pit stop strategies.

### UC-13 Pit Window Prediction

Prediction of optimal pit windows using historical data.

### UC-14 AI Strategy Assistant

AI-powered race engineering and strategy recommendations.

---

# 6. Summary

Current platform capabilities include:

- Race Information Retrieval
- Driver Selection
- Telemetry Comparison
- Track Visualization
- Speed Heatmap Analysis
- Lap Delta Analysis
- Strategy Evaluation
- Recommendation Generation

These use cases define the primary functional behavior of the F1 Strategy Lab platform.
