from fastapi import FastAPI

app = FastAPI(
    title="F1 Strategy Lab API",
    version="0.1.0"
)

@app.get("/")
def root():
    return {
        "status": "online",
        "project": "F1 Strategy Lab"
    }