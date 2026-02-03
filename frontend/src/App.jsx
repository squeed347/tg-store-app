import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from './components/ProductCard'
import Cart from './components/components/Cart'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Telegram production API
    const API_URL = 'https://your-render-app.onrender.com/api'
    // Local development: '/api'
    
    axios.get(`${API_URL}/products`)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        )
      }
      return [...prev, {...product, quantity: 1}]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  if (loading) return <div>Загрузка меню...</div>

  return (
    <div className="tg-store-app">
      <h1>🍕 Быстрая еда</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
      <Cart cart={cart} onRemove={removeFromCart} />
    </div>
  )
}
