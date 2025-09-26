import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';
import Spinner from '../components/common/Spinner';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addItemToCart } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
        if (!response.ok) throw new Error('No se pudo encontrar el producto.');
        const data = await response.json();
        setProduct(data);

        if (Array.isArray(data.urls_imagenes) && data.urls_imagenes.length > 0) {
          setMainImage(data.urls_imagenes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const variantsData = useMemo(() => {
    if (!product?.variantes) return {};
    const sizes = [...new Set(product.variantes.map(v => v.tamanio))];
    const colors = [...new Set(product.variantes.map(v => v.color))];
    return { sizes, colors, all: product.variantes };
  }, [product]);

  useEffect(() => {
    if (selectedSize && selectedColor) {
      const variant = variantsData.all?.find(
        v => v.tamanio === selectedSize && v.color === selectedColor
      );
      setSelectedVariant(variant || null);
    } else {
      setSelectedVariant(null);
    }
  }, [selectedSize, selectedColor, variantsData]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const availableColors = variantsData.all
      .filter(v => v.tamanio === size && v.cantidad_en_stock > 0)
      .map(v => v.color);
    if (!availableColors.includes(selectedColor)) {
      setSelectedColor(null);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const availableSizes = variantsData.all
      .filter(v => v.color === color && v.cantidad_en_stock > 0)
      .map(v => v.tamanio);
    if (!availableSizes.includes(selectedSize)) {
      setSelectedSize(null);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      notify("Por favor, seleccioná un talle y color.", "error");
      return;
    }
    const itemToAdd = {
      variante_id: selectedVariant.id,
      quantity: 1,
      price: product.precio,
      name: `${product.nombre} (${selectedVariant.tamanio} / ${selectedVariant.color})`,
      image_url: Array.isArray(product.urls_imagenes) && product.urls_imagenes.length > 0 ? product.urls_imagenes[0] : null,
    };
    addItemToCart(itemToAdd);
    notify(`${itemToAdd.name} fue agregado a tu carrito!`);
  };

  if (loading) return <Spinner message="Buscando en el perchero..." />;
  if (error) return <div className="error-container"><h1>Error: {error}</h1></div>;
  if (!product) return <div className="loading-container"><h1>Producto no encontrado.</h1></div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-images">
        <div className="main-image-container">
          <img src={mainImage || '/img/placeholder.png'} alt={product.nombre} className="main-product-image"/>
        </div>
        {Array.isArray(product.urls_imagenes) && product.urls_imagenes.length > 1 && (
          <div className="thumbnail-gallery">
            {product.urls_imagenes.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`Thumbnail ${index + 1}`} 
                className={`thumbnail-image ${url === mainImage ? 'active' : ''}`}
                onClick={() => setMainImage(url)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="product-detail-info">
        <h1 className="product-title">{product.nombre}</h1>
        <p className="product-price">${product.precio}</p>
        <p className="product-description">{product.descripcion}</p>
        
        <div className="variant-selectors">
          <div className="selector">
            <label>Talle:</label>
            <div className="options">
              {variantsData.sizes?.map(size => {
                const isAvailable = variantsData.all.some(v => v.tamanio === size && v.cantidad_en_stock > 0);
                return (
                    <button key={size} onClick={() => handleSizeSelect(size)} className={`option-button ${selectedSize === size ? 'selected' : ''}`} disabled={!isAvailable}>
                      {size}
                    </button>
                )
              })}
            </div>
          </div>
          <div className="selector">
            <label>Color:</label>
            <div className="options">
              {variantsData.colors?.map(color => {
                const isAvailable = variantsData.all.some(v => v.color === color && v.cantidad_en_stock > 0 && (!selectedSize || v.tamanio === selectedSize));
                return (
                    <button key={color} onClick={() => handleColorSelect(color)} className={`option-button ${selectedColor === color ? 'selected' : ''}`} disabled={!isAvailable}>
                        {color}
                    </button>
                )
              })}
            </div>
          </div>
        </div>
        
        <p className="stock-info">
          {selectedVariant 
            ? (selectedVariant.cantidad_en_stock > 0 ? `${selectedVariant.cantidad_en_stock} disponibles` : 'Sin stock para esta combinación') 
            : 'Seleccioná talle y color para ver el stock'
          }
        </p>
        <button 
          className="add-to-bag-button" 
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.cantidad_en_stock === 0}
        >
          {!selectedVariant || selectedVariant.cantidad_en_stock === 0 ? 'NO DISPONIBLE' : 'ADD TO BAG'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;