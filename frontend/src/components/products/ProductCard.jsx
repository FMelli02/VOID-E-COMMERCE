import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onQuickViewClick }) => {
  const mainImageUrl = Array.isArray(product.urls_imagenes) && product.urls_imagenes.length > 0
    ? product.urls_imagenes[0]
    : null;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {mainImageUrl ? (
          <img src={mainImageUrl} alt={product.nombre} />
        ) : (
          <div className="no-image-placeholder">VOID</div>
        )}
      </Link>
      <div className="product-card-overlay">
        <div>
          <h3 className="product-name">{product.nombre}</h3>
          <p className="product-price">${product.precio}</p>
        </div>
        <button className="quick-view-btn" onClick={() => onQuickViewClick(product)}>
          Vista Rápida
        </button>
      </div>
    </div>
  );
};

export default ProductCard;