import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

const AdminProductFormPage = () => {
  const { productId } = useParams(); // Si hay un ID en la URL, estamos editando
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { notify } = useContext(NotificationContext);

  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    sku: '',
    urls_imagenes: '',
    material: '',
    talle: '',
    color: '',
    stock: 0,
    categoria_id: 1, // Asumimos 1 por defecto
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = Boolean(productId);

  // Si estamos editando, buscamos los datos del producto para llenar el formulario
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
          if (!response.ok) throw new Error('No se pudo cargar el producto para editar.');
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, isEditing]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isEditing
      ? `http://127.0.0.1:8000/api/admin/products/${productId}`
      : 'http://127.0.0.1:8000/api/admin/products';
      
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ocurrió un error.');
      }
      
      notify(`Producto ${isEditing ? 'actualizado' : 'creado'} con éxito!`);
      navigate('/admin/products'); // Volvemos a la tabla de productos

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing && loading) return <h2>Cargando producto...</h2>;

  return (
    <div>
      <h1>{isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          {/* Mapeamos los campos para no repetir tanto código */}
          {Object.keys(product).filter(key => !['id', 'variantes'].includes(key)).map(key => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</label>
              <input
                type={typeof product[key] === 'number' ? 'number' : 'text'}
                id={key}
                name={key}
                value={product[key]}
                onChange={handleChange}
                required={!['descripcion', 'urls_imagenes', 'material', 'talle', 'color'].includes(key)}
              />
            </div>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductFormPage;