import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <h2>Cargando órdenes...</h2>;
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
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.usuario_id}</td>
              <td>${order.monto_total}</td>
              <td>
                <span className={`status-badge status-${order.estado_pago?.toLowerCase()}`}>
                  {order.estado_pago || 'N/A'}
                </span>
              </td>
              {/* Formateamos la fecha para que sea más legible */}
              <td>{new Date(order.creado_en).toLocaleDateString()}</td>
              <td className="actions-cell">
                <button className="action-btn view">Ver Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;