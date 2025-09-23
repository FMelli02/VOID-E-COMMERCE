// En frontend/src/components/products/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// El componente ahora recibe un 'product' y lo muestra
const ProductCard = ({ product }) => {
  return (
    // Envolvemos la tarjeta en un Link para que nos lleve al detalle del producto en el futuro
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        {product.urls_imagenes ? (
          <img src={product.urls_imagenes} alt={product.nombre} />
        ) : (
          <div className="no-image-placeholder">VOID</div>
        )}
        <div className="product-card-overlay">
          <h3 className="product-name">{product.nombre}</h3>
          <p className="product-price">${product.precio}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;