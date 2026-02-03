const Cart = ({ cart, onRemove }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl max-w-md mx-auto">
    <h2 className="text-2xl font-black text-white mb-4 flex items-center">
      🛒 Корзина 
      <span className="ml-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        {cart.reduce((sum, item) => sum + item.quantity, 0)}
      </span>
    </h2>
    
    {cart.length === 0 ? (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">🛒</span>
        </div>
        <p className="text-white/70 text-lg">Корзина пуста</p>
      </div>
    ) : (
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {cart.map(item => (
          <div key={item.id} className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">{item.name}</div>
              <div className="text-orange-400 font-bold text-lg">
                {item.price * item.quantity}₽
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/70">×{item.quantity}</span>
              <button 
                onClick={() => onRemove(item.id)}
                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <div className="pt-4 border-t-2 border-white/20 mt-4">
          <div className="text-right">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Cart;
