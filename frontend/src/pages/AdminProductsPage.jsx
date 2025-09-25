// En frontend/src/pages/AdminProductsPage.jsx

import React, { useState, useEffect, useContext } from 'react'; // 1. IMPORTAMOS useContext
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 2. IMPORTAMOS EL AuthContext
import { NotificationContext } from '../context/NotificationContext';
import Spinner from '../components/common/Spinner';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext); // 3. OBTENEMOS EL TOKEN DEL CONTEXTO
  const { notify } = useContext(NotificationContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products?limit=100');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos.');
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

  const handleDelete = async (productId) => {
    if (!window.confirm('¿Estás seguro de que querés borrar este producto? Es para siempre.')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // <-- AHORA 'token' SÍ EXISTE
        }
      });

      if (response.ok) { // El backend de admin no devuelve JSON al borrar
        setProducts(products.filter(p => p.id !== productId));
        notify('Producto eliminado con éxito.');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'No se pudo eliminar el producto.');
      }
      
    } catch (err) {
      setError(err.message);
      notify(`Error: ${err.message}`);
    }
  };

  if (loading) return <Spinner message="Cargando inventario..." />;
  if (error) return <h2 className="error-message">Error: {error}</h2>;

  return (
    <div>
      <div className="admin-header">
        <h1>Gestión de Productos</h1>
        <Link to="/admin/products/new" className="add-product-btn">Añadir Producto</Link>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>SKU</th>
            <th>Precio</th>
            <th>Stock Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{product.sku}</td>
              <td>${product.precio}</td>
              <td>{product.stock}</td>
              <td className="actions-cell">
                <Link to={`/admin/products/edit/${product.id}`} className="action-btn edit">Editar</Link>
                <Link to={`/admin/products/${product.id}/variants`} className="action-btn variants">Variantes</Link>
                <button 
                  className="action-btn delete" 
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsPage;