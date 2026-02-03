const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img src={product.image || '/placeholder-food.jpg'} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p className="price">{product.price}₽</p>
    <button onClick={() => onAddToCart(product)}>+ В корзину</button>
  </div>
)