// En frontend/src/pages/ProductDetailPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addItemToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- ¡NUEVO! Estados para manejar la variante seleccionada ---
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('No se pudo encontrar el producto.');
        }
        const data = await response.json();
        setProduct(data);
        // Por defecto, seleccionamos la primera variante disponible
        if (data.variantes && data.variantes.length > 0) {
          setSelectedVariant(data.variantes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Por favor, seleccioná un talle y color.");
      return;
    }

    const itemToAdd = {
      variante_id: selectedVariant.id, // <-- ¡AHORA USAMOS EL ID DE LA VARIANTE!
      quantity: 1,
      price: product.precio, // El precio sigue siendo del producto principal
      name: `${product.nombre} (${selectedVariant.tamanio} / ${selectedVariant.color})`,
      image_url: product.urls_imagenes,
    };
    
    addItemToCart(itemToAdd);
    alert(`${itemToAdd.name} fue agregado a tu carrito!`);
  };

  if (loading) return <div className="loading-container"><h1>Buscando en el perchero...</h1></div>;
  if (error) return <div className="error-container"><h1>Error: {error}</h1></div>;
  if (!product) return <div className="loading-container"><h1>Producto no encontrado.</h1></div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.urls_imagenes || '/img/placeholder.png'} alt={product.nombre} />
      </div>
      <div className="product-detail-info">
        <h1 className="product-title">{product.nombre}</h1>
        <p className="product-price">${product.precio}</p>
        <p className="product-description">{product.descripcion}</p>
        
        {/* --- ¡NUEVO! Selector de Variantes --- */}
        <div className="variant-selectors">
          <div className="selector">
            <label>Talle:</label>
            <div className="options">
              {product.variantes.map(variant => (
                <button 
                  key={variant.id}
                  className={`option-button ${selectedVariant?.id === variant.id ? 'selected' : ''}`}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={variant.cantidad_en_stock === 0}
                >
                  {variant.tamanio}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mostramos el stock de la variante seleccionada */}
        {selectedVariant && (
          <p className="stock-info">
            {selectedVariant.cantidad_en_stock > 0 
              ? `${selectedVariant.cantidad_en_stock} disponibles`
              : 'Sin stock'}
          </p>
        )}

        <button 
          className="add-to-bag-button" 
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.cantidad_en_stock === 0}
        >
          {selectedVariant?.cantidad_en_stock > 0 ? 'ADD TO BAG' : 'SIN STOCK'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;