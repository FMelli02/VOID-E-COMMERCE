// En frontend/src/context/CartContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// 1. Creamos el Contexto
export const CartContext = createContext();

// 2. Creamos el "Proveedor" del contexto.
// Este componente va a envolver toda nuestra aplicación y le va a dar acceso al carrito.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- LÓGICA PARA MANEJAR EL CARRITO DE INVITADOS ---
  useEffect(() => {
    const initializeCart = async () => {
      let guestId = localStorage.getItem('guest_session_id');

      // Si no hay ID de invitado, pedimos uno nuevo al backend
      if (!guestId) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/cart/session/guest');
          const data = await response.json();
          guestId = data.guest_session_id;
          localStorage.setItem('guest_session_id', guestId);
        } catch (error) {
          console.error("Error al crear sesión de invitado:", error);
          setLoading(false);
          return;
        }
      }

      // Con el ID, vamos a buscar el carrito al backend
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cart/', {
          headers: {
            'X-Guest-Session-ID': guestId,
          },
        });
        const cartData = await response.json();
        setCart(cartData);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  // --- FUNCIÓN PARA AGREGAR ITEMS AL CARRITO ---
  const addItemToCart = async (item) => {
    const guestId = localStorage.getItem('guest_session_id');
    if (!cart || !guestId) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Guest-Session-ID': guestId,
        },
        body: JSON.stringify(item),
      });
      const updatedCart = await response.json();
      setCart(updatedCart);
      console.log("Producto agregado:", updatedCart);
    } catch (error) {
      console.error("Error al agregar item al carrito:", error);
    }
  };

  const removeItemFromCart = async (variante_id) => {
    const guestId = localStorage.getItem('guest_session_id');
    if (!guestId) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/items/${variante_id}`, {
        method: 'DELETE',
        headers: {
          'X-Guest-Session-ID': guestId,
        },
      });
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error al eliminar item del carrito:", error);
    }
  };

  // El valor que compartiremos con toda la app
  const value = {
    cart,
    loading,
    itemCount: cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};