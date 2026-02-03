const CartIcon = ({ cart, totalPrice, onOpen }) => (
  <div className="cart-icon" onClick={onOpen}>
    <div className="cart-badge">
      {cart.reduce((sum, item) => sum + item.quantity, 0)}
    </div>
    <span>🛒</span>
    <div className="cart-price">{totalPrice.toFixed(0)}₽</div>
  </div>
);

export default CartIcon;
