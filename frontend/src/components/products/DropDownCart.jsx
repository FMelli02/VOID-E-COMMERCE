// En frontend/src/components/products/DropDownCart.jsx

import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // 1. Importar el contexto

const DropDownCart = () => {
  // 2. Usar el contexto para obtener el carrito y el total
  const { cart, loading } = useContext(CartContext);

  // Calculamos el total del carrito
  const cartTotal = cart?.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  if (loading) {
    return <div>Cargando carrito...</div>;
  }

  return (
    <div>
      <h4>Mi Carrito</h4>
      {cart && cart.items.length > 0 ? (
        <ul className="cart-items-list">
          {cart.items.map(item => (
            <li key={item.variante_id} className="cart-item">
              <span className="item-name">{item.name} (x{item.quantity})</span>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
      <div className="cart-total">
        <p>Total: ${cartTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DropDownCart;