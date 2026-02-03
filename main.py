from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Мое первое API")  # ← Эта строка ОБЯЗАТЕЛЬНА

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World от FastAPI!"}

@app.get("/api/test")
async def test_api():
    return {
        "status": "success",
        "data": {"version": "1.0", "timestamp": "2026-02-03"}
    }
