import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // 1. ✅ ВСЕ СОСТОЯНИЯ ПЕРВЫМИ
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [activeCategory, setActiveCategory] = useState('all')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // 2. Загрузка данных
  useEffect(() => {
    axios.get('/tg-store-app/products.json').then(res => {
      setProducts(res.data)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  // 3. Функции корзины
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id))
      return
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const filteredProducts = products.filter(product => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'favorites') return favorites.has(product.id)
    return product.category === activeCategory
  })

  if (loading) {
    return (
      <div className="app">
        <div className="loading">🔄 Загрузка меню...</div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* ПЛАВАЮЩАЯ КОРЗИНА СВЕРХУ */}
      <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
        <div className="cart-badge">{getTotalItems()}</div>
        <span>🛒</span>
        <div className="cart-price">{getTotalPrice().toFixed(0)}₽</div>
      </div>

      <h1>🍔 TG Store - Быстрая еда</h1>

      {/* КАТЕГОРИИ */}
      <div className="category-tabs">
        <button 
          className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          🍽️ Все
        </button>
        <button 
          className={`tab-btn ${activeCategory === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveCategory('favorites')}
        >
          ❤️ Избранное ({Array.from(favorites).length})
        </button>
        <button 
          className={`tab-btn ${activeCategory === 'burgers' ? 'active' : ''}`}
          onClick={() => setActiveCategory('burgers')}
        >
          🍔 Бургеры
        </button>
        <button 
          className={`tab-btn ${activeCategory === 'breakfast' ? 'active' : ''}`}
          onClick={() => setActiveCategory('breakfast')}
        >
          ☀️ Завтрак
        </button>
      </div>

      {/* ✅ ИСПРАВЛЕННЫЕ ПРОДУКТЫ - ЦЕНА НАД КНОПКАМИ */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            Здесь пока нет блюд 😔
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              {/* ЛАЙК - ВЕРХНИЙ ПРАВЫЙ УГОЛ */}
              <button 
                className={`favorite-btn ${favorites.has(product.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.has(product.id) ? '❤️' : '🤍'}
              </button>

              {/* ✅ ИЗОБРАЖЕНИЕ */}
              <div className="product-image">{product.emoji}</div>
              
              {/* ✅ НАЗВАНИЕ */}
              <h3>{product.name}</h3>
              
              {/* ✅ ОПИСАНИЕ */}
              <p>{product.description}</p>
              
              {/* ✅ ЦЕНА НАД КНОПКАМИ ← ИСПРАВЛЕНО! */}
              <div className="price">{product.price}₽</div>
              
              {/* ✅ КНОПКИ В НИЗУ */}
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  + В корзину
                </button>
                <button className="customize-btn">⚙️ Настроить</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* МОДАЛЬНАЯ КОРЗИНА */}
      {isCartOpen && (
        <div className="cart-modal" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>🛒 Корзина ({getTotalItems()})</h2>
              <button 
                className="close-btn" 
                onClick={() => setIsCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span className="empty-icon">🛒</span>
                <p>Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-left">
                        <span className="emoji">{item.emoji}</span>
                        <div>
                          <div className="item-name">{item.name}</div>
                          <div className="item-price">{item.price}₽</div>
                        </div>
                      </div>
                      
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-minus"
                        >
                          −
                        </button>
                        <span className="qty">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-plus"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        {(item.price * item.quantity).toFixed(0)}₽
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="total-row">
                    <span>Итого:</span>
                    <strong>{getTotalPrice().toFixed(0)}₽</strong>
                  </div>
                  <button className="order-btn">Оформить заказ</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
