const Cart = ({ cart, onRemove, onClear }) => (
  <div className="cart">
    <h2>🛒 Корзина ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
    {cart.map(item => (
      <div key={item.id} className="cart-item">
        {item.name} × {item.quantity} = {item.price * item.quantity}₽
        <button onClick={() => onRemove(item.id)}>-</button>
      </div>
    ))}
    <button className="checkout" onClick={onClear}>Оформить заказ</button>
  </div>
)
