# API Reference

## 1. Introduction

This document describes the REST API exposed by the F1 Strategy Lab backend.

The API is implemented using FastAPI and provides endpoints for:

- Race Information
- Telemetry Analysis
- Track Visualization
- Lap Delta Analysis
- Strategy Analysis
- Recommendation Generation

---

# 2. Base URL

Local Development:

```text
http://localhost:8000
```

---

# 3. Endpoints

## Health Check

### Endpoint

```http
GET /
```

### Response

```json
{
	"status": "online",
	"project": "F1 Strategy Lab"
}
```

---

## Race Information

### Endpoint

```http
GET /race/{year}/{grand_prix}
```

### Description

Returns metadata for a selected Formula 1 race.

### Example

```http
GET /race/2024/Bahrain
```

### Response

```json
{
	"event": "Bahrain Grand Prix",
	"location": "Sakhir",
	"country": "Bahrain",
	"year": 2024,
	"drivers": ["VER", "PER", "SAI", "LEC"]
}
```

---

## Driver Telemetry

### Endpoint

```http
GET /telemetry/{year}/{grand_prix}/{driver}
```

### Description

Returns telemetry data for the selected driver's fastest lap.

### Example

```http
GET /telemetry/2024/Bahrain/VER
```

### Response

```json
{
	"driver": "VER",
	"speed": [],
	"throttle": [],
	"brake": [],
	"rpm": [],
	"gear": [],
	"drs": [],
	"samples": []
}
```

---

## Track Map

### Endpoint

```http
GET /track/{year}/{grand_prix}/{driver}
```

### Description

Returns track coordinates and speed data for visualization.

### Example

```http
GET /track/2024/Bahrain/VER
```

### Response

```json
{
	"driver": "VER",
	"x": [],
	"y": [],
	"speed": []
}
```

---

## Lap Delta Analysis

### Endpoint

```http
GET /delta/{year}/{grand_prix}/{driver_a}/{driver_b}
```

### Description

Returns telemetry delta between two drivers.

### Example

```http
GET /delta/2024/Bahrain/VER/HAM
```

### Response

```json
{
	"driver_a": "VER",
	"driver_b": "HAM",
	"delta": [],
	"samples": []
}
```

---

## Strategy Analysis

### Endpoint

```http
GET /strategy/{year}/{grand_prix}/{driver}
```

### Description

Returns tyre strategy and stint information.

### Example

```http
GET /strategy/2024/Bahrain/VER
```

### Response

```json
{
	"driver": "VER",
	"stints": [
		{
			"compound": "SOFT",
			"start_lap": 1,
			"end_lap": 17
		},
		{
			"compound": "HARD",
			"start_lap": 18,
			"end_lap": 37
		}
	]
}
```

---

## Strategy Recommendation

### Endpoint

```http
GET /recommendation/{year}/{grand_prix}/{driver}
```

### Description

Generates a strategy recommendation for a selected driver.

### Example

```http
GET /recommendation/2024/Bahrain/VER
```

### Response

```json
{
	"driver": "VER",
	"current_compound": "SOFT",
	"current_tyre_life": 20,
	"recommended_pit_lap": 57,
	"remaining_laps": -2,
	"message": "BOX THIS LAP"
}
```

---

# 4. Response Format

All successful requests return JSON responses.

Example:

```json
{
	"key": "value"
}
```

---

# 5. Error Responses

### Invalid Driver

```json
{
	"detail": "Driver not found"
}
```

### Invalid Grand Prix

```json
{
	"detail": "Grand Prix not found"
}
```

### Internal Server Error

```json
{
	"detail": "Internal server error"
}
```

---

# 6. Frontend Integration

Frontend API requests are centralized in:

```text
frontend/lib/api.ts
```

Available helper functions include:

```ts
getRace();
getTelemetry();
getTrack();
getDelta();
getStrategy();
getRecommendation();
```

---

# 7. Future Endpoints

The following endpoints are planned for future releases:

### Race Search

```http
GET /races
```

### Driver Search

```http
GET /drivers
```

### Sector Analysis

```http
GET /sector/{year}/{grand_prix}/{driver}
```

### Strategy Simulation

```http
POST /simulate
```

### AI Analytics

```http
POST /analyze
```

---

# 8. Summary

The current API provides six analytical endpoints covering:

- Race Information
- Telemetry Analysis
- Track Visualization
- Lap Delta Analysis
- Strategy Analysis
- Recommendation Generation

These endpoints form the backend foundation of F1 Strategy Lab and support all current dashboard functionality.
