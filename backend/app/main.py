from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.fastf1_service import get_race_info

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


@app.get("/race/{year}/{grand_prix}")
def get_race(year: int, grand_prix: str):
    return get_race_info(year, grand_prix)
