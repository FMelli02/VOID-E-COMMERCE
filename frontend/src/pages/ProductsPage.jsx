import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import FilterMenu from '../components/products/FilterMenu';
import ProductModal from '../components/products/ProductModal'; 
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import Spinner from '../components/common/Spinner';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    material: '',
    precio_max: '',
    talle: '',
    color: '',
    sort_by: ''
  });
  
  // Hook para leer los parámetros de la URL (como el ?search=...)
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      // Creamos la URL con los filtros que no estén vacíos
      const query = new URLSearchParams();
      
      // Chequeamos si vino algo del buscador del header
      const searchQuery = searchParams.get('search');
      if (searchQuery) {
        // En tu backend no tenés un filtro de búsqueda general,
        // así que por ahora lo simulamos filtrando por nombre.
        query.append('nombre', searchQuery); 
      }
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          query.append(key, value);
        }
      });

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/?${query.toString()}`);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchParams]); // Se ejecuta de nuevo si cambian los filtros o la búsqueda

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (error) return <div className="error-container"><h1>Error: {error}</h1></div>;

  return (
    <>
      <div className="products-page-container">
        <aside className="filters-sidebar">
          <FilterMenu filters={filters} setFilters={setFilters} />
        </aside>
        <main className="products-grid-main">
          {loading ? (
             <div className="product-grid">
               {/* Creamos una grilla de esqueletos */}
               {Array.from({ length: 6 }).map((_, index) => (
                 <ProductCardSkeleton key={index} />
               ))}
             </div>
          ) : (
            <div className="product-grid">
              {products.length > 0 ? (
                  products.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onQuickViewClick={handleOpenModal}  
                      />
                  ))
              ) : (
                  <h2>No se encontraron productos con esos filtros.</h2>
              )}
            </div>
          )}
        </main>
      </div>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default ProductsPage;