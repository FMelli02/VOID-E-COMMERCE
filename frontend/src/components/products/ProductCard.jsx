import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onQuickViewClick }) => { //ProductModal.jsx --> onQuickViewClick
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {product.urls_imagenes ? (
          <img src={product.urls_imagenes} alt={product.nombre} />
        ) : (
          <div className="no-image-placeholder">VOID</div>
        )}
      </Link>
      <div className="product-card-overlay">
        <div>
          <h3 className="product-name">{product.nombre}</h3>
          <p className="product-price">${product.precio}</p>
        </div>
        {/* --- EL BOTÓN MÁGICO --- */}
        <button className="quick-view-btn" onClick={() => onQuickViewClick(product)}>
          Vista Rápida
        </button>
      </div>
    </div>
  );
};

export default ProductCard;