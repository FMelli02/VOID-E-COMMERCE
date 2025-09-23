// En frontend/src/pages/ProductsPage.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard'; // <-- ¡Importamos nuestro nuevo componente!

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Por ahora, trae TODOS los productos. Más adelante le agregaremos filtros.
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
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

  if (loading) return <div className="loading-container"><h1>Cargando...</h1></div>;
  if (error) return <div className="error-container"><h1>Error: {error}</h1></div>;

  return (
    <div className="products-page-container">
      <aside className="filters-sidebar">
        {/* Acá irán los filtros más adelante */}
        <h2>Filtros</h2>
      </aside>
      <main className="products-grid-main">
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} /> // <-- Usamos el componente reutilizable
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;