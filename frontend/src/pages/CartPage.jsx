import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cart, loading, addItemToCart } = useContext(CartContext); // <-- Podríamos agregar funciones para sacar o cambiar cantidad después

  if (loading) {
    return <div className="loading-container"><h1>Cargando tu carrito...</h1></div>;
  }

  const cartTotal = cart?.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkout/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('No se pudo crear la preferencia de pago.');
      }

      const preference = await response.json();
      // Redirigimos al usuario a la página de pago de MercadoPago
      window.location.href = preference.init_point;

    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al intentar procesar el pago. Por favor, intentá de nuevo.");
    }
  };

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">TU CARRITO</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart && cart.items.length > 0 ? (
            cart.items.map(item => (
              <div key={item.variante_id} className="cart-page-item">
                <div className="item-image">
                  <img src={item.image_url || '/img/placeholder.png'} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <div className="item-price">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No tenés nada en el carrito. ¡Andá a llenarlo!</p>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="cart-summary">
            <h2>Resumen</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-button">
              IR A PAGAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;