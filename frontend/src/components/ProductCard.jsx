const ProductCard = ({ product, onAddToCart, onToggleFavorite, onCustomize, isFavorite }) => (
  <div className="product-card">
    {/* Лайк кнопка */}
    <div className="product-actions">
      <button 
        onClick={() => onToggleFavorite(product.id)}
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
    
    {/* Изображение */}
    <div className="product-image">
      <span className="emoji">{product.emoji || '🍽️'}</span>
    </div>
    
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    
    {/* Кнопки */}
    <div className="product-buttons">
      <button className="add-btn" onClick={() => onAddToCart(product)}>
        + В корзину
      </button>
      <button className="customize-btn" onClick={() => onCustomize(product)}>
        ⚙️ Настроить
      </button>
    </div>
    
    <div className="price">{product.price}₽</div>
  </div>
);

export default ProductCard;
