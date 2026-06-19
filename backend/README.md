# F1 Strategy Lab Backend

The backend is responsible for retrieving Formula 1 race data, processing telemetry, performing strategy analysis, and exposing analytical endpoints through a FastAPI REST API.

---

# Technology Stack

- Python
- FastAPI
- FastF1

---

# Local Development

## Create Virtual Environment

```bash
python -m venv .venv
```

## Activate Environment

### Linux / macOS

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Backend

From the backend directory:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

---

# API Documentation

FastAPI automatically generates interactive API documentation.

Swagger UI:

```text
http://localhost:8000/docs
```

ReDoc:

```text
http://localhost:8000/redoc
```

---

# Project Structure

```text
backend/
│
├── app/
│
├── routes/
│
├── services/
│
├── main.py
│
└── requirements.txt
```

---

# Core Services

- FastF1 Service
- Telemetry Service
- Track Service
- Delta Service
- Strategy Service
- Recommendation Service

---

# Available Endpoints

```text
GET /race/{year}/{grand_prix}

GET /telemetry/{year}/{grand_prix}/{driver}

GET /track/{year}/{grand_prix}/{driver}

GET /delta/{year}/{grand_prix}/{driver_a}/{driver_b}

GET /strategy/{year}/{grand_prix}/{driver}

GET /recommendation/{year}/{grand_prix}/{driver}
```

---

# Notes

The backend relies on FastF1 session data.

The first request for a race may take longer due to data retrieval and caching.

Subsequent requests are typically much faster.
