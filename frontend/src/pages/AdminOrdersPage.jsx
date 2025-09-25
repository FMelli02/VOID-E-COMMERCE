import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/common/Spinner'; // Usamos el spinner para la carga

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/sales', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar las órdenes.');
        }
        
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <Spinner message="Cargando órdenes..." />;
  if (error) return <h2 className="error-message">Error: {error}</h2>;

  return (
    <div>
      <div className="admin-header">
        <h1>Gestión de Órdenes</h1>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>ID Usuario</th>
            <th>Monto Total</th>
            <th>Estado Pago</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td title={order.usuario_id}>{order.usuario_id.slice(0, 8)}...</td>
                <td>${parseFloat(order.monto_total).toLocaleString('es-AR')}</td>
                <td>
                  <span className={`status-badge status-${order.estado_pago?.toLowerCase()}`}>
                    {order.estado_pago || 'N/A'}
                  </span>
                </td>
                <td>{new Date(order.creado_en).toLocaleDateString('es-AR')}</td>
                <td className="actions-cell">
                  <Link to={`/admin/orders/${order.id}`} className="action-btn view">
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{textAlign: 'center'}}>Todavía no hay ninguna orden. ¡A vender!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;