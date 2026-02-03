from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

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

class Product(BaseModel):
    id: int
    name: str
    price: float
    description: str
    image: str = ""
    category: str

products_db = [
    Product(id=1, name="🍔 Бургер классический", price=350, description="Сочная котлета, сыр, овощи", category="burgers"),
    Product(id=2, name="🍕 Маргарита", price=450, description="Томат, моцарелла, базилик", category="pizza"),
    Product(id=3, name="🥤 Кола 0.5л", price=150, description="Газировка", category="drinks"),
    # Добавьте свои блюда!
]

@app.get("/api/products", response_model=List[Product])
async def get_products():
    return products_db

@app.get("/api/products/{category}")
async def get_products_by_category(category: str):
    return [p for p in products_db if p.category == category]