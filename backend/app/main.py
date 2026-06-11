from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="F1 Strategy Lab API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "online", "project": "F1 Strategy Lab"}


@app.get("/race/mock")
def mock_race():
    return {
        "race": "Bahrain GP",
        "year": 2024,
        "drivers": [{"name": "Max Verstappen", "lap_times": [95.2, 95.0, 94.8]}],
    }
