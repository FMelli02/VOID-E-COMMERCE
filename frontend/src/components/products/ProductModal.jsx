import React from 'react';
import { Link } from 'react-router-dom';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={product.urls_imagenes || '/img/placeholder.png'} alt={product.nombre} />
          </div>
          <div className="modal-info">
            <h2>{product.nombre}</h2>
            <p className="modal-price">${product.precio}</p>
            <p className="modal-description">{product.descripcion}</p>
            {/* Link para ir a la página completa y elegir talle/color */}
            <Link to={`/product/${product.id}`} className="modal-details-link" onClick={onClose}>
              Ver detalles y comprar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;