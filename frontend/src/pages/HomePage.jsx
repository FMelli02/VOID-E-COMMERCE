// En frontend/src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  // --- ¡NUEVO! Estados para guardar los productos ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- ¡NUEVO! Lógica para buscar los productos en tu backend ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'No se pudieron cargar los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Tu animación de GSAP (la dejamos como está)
  useEffect(() => {
    if (!loading) { // Solo corremos la animación cuando ya terminamos de cargar
        gsap.to(".new-arrivals", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: 0.5,
            scrollTrigger: {
                trigger: ".new-arrivals",
                start: "top 80%", // La animación empieza cuando el 80% de la sección es visible
                toggleActions: "play none none none"
            }
        });
    }
  }, [loading]); // Se ejecuta cuando 'loading' cambia

  return (
    <main>
      {/* Sección de la portada (sin cambios) */}
      <section className="hero-section">
        <div className="hero-image-left">
          <img src="/img/PortadaIzquierda.png" alt="Modelo con prenda vanguardista" />
        </div>
        <div className="hero-image-right">
          <img src="/img/PortadaDerecha.png" alt="Modelo con traje sastre oscuro" />
        </div>
      </section>

      {/* --- SECCIÓN DE PRODUCTOS MODIFICADA --- */}
      <section className="new-arrivals">
        <div className="section-title-container">
          <h2 className="section-title">THE NEW</h2>
          <div className="title-line"></div>
        </div>

        <div className="product-grid">
          {loading && <p>Cargando...</p>}
          {error && <p className="error-message">Error: {error}</p>}
          {!loading && !error && (
            products.length > 0 ? (
              products.map(product => (
                <div className="product-card" key={product.id}>
                  {/* ¡OJO! Tu modelo de producto tiene 'urls_imagenes'. 
                      Asumo que es un string con una URL. Si es una lista, hay que ajustarlo. 
                      Por ahora, si no hay imagen, no muestra nada. */}
                  {product.urls_imagenes ? (
                    <img src={product.urls_imagenes} alt={product.nombre} />
                  ) : (
                    <div className="no-image-placeholder">VOID</div>
                  )}
                  {/* Podríamos agregar el nombre del producto sobre la imagen más adelante */}
                </div>
              ))
            ) : (
              <p>No hay productos para mostrar por el momento.</p>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;