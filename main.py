from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="TG Store API")

# CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://squeed347.github.io",  # ← GitHub Pages
        "https://squeed347.github.io/tg-store-app"  # ← Полный URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: int
    name: str
    price: float
    description: str
    category: str

# РЕАЛЬНОЕ МЕНЮ 🍔
products_db = [
    Product(id=1, name="🍔 Бургер Короли", price=350, description="Сочная говядина", category="burgers", emoji="🍔", favorite=False),
    Product(id=2, name="🥞 Блины с мёдом", price=250, description="Тёплые, с золотистой корочкой", category="breakfast", emoji="🥞", favorite=False),
    Product(id=3, name="🍲 Борщ", price=320, description="Красный, наваристый", category="lunch", emoji="🍲", favorite=True),
    # ... остальные блюда с категориями: "dinner", "burgers", "pizza"
]

@app.get("/")
async def root():
    return {"message": "🍕 TG Store API работает!"}

@app.get("/api/test")
async def test_api():
    return {"status": "success", "data": {"version": "1.0"}}

@app.get("/api/products", response_model=List[Product])
async def get_products():
    return products_db

@app.get("/api/products/{category}")
async def get_products_by_category(category: str):
    return [p for p in products_db if p.category == category]

@app.get("/api/categories")
async def get_categories():
    return [
        {"id": "favorites", "name": "Избранное ❤️", "emoji": "❤️"},
        {"id": "all", "name": "Все", "emoji": "🍽️"},
        {"id": "breakfast", "name": "Завтрак ☀️", "emoji": "☀️"},
        {"id": "lunch", "name": "Обед 🍲", "emoji": "🍲"},
        {"id": "dinner", "name": "Ужин 🌙", "emoji": "🌙"},
    ]