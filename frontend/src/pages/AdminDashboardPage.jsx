import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const AdminDashboardPage = () => {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchKpis = async () => {
      if (!token) return; // Si no hay token, no hacemos nada

      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/metrics/kpis', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar las métricas.');
        }

        const data = await response.json();
        setKpis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, [token]); // Se ejecuta cuando el token está disponible

  return (
    <div> {/* Cambiado el div contenedor del AdminLayout que ya tenías */}
        <h1>Bienvenido al Panel de Administrador</h1>
        <p>Desde acá vas a poder controlar toda la magia de VOID.</p>
        
        {loading && <Spinner message="Cargando métricas..." />}
        {error && <p className="error-message">Error: {error}</p>}
        
        {kpis && (
          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Ingresos Totales</h3>
              {/* Le damos formato de moneda para que quede más prolijo */}
              <p className="widget-value">${kpis.total_revenue.toLocaleString('es-AR')}</p>
            </div>
            <div className="widget">
              <h3>Ticket Promedio</h3>
              <p className="widget-value">${kpis.average_ticket.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
            <div className="widget">
              <h3>Órdenes Totales</h3>
              <p className="widget-value">{kpis.total_orders}</p>
            </div>
             <div className="widget">
              <h3>Usuarios Registrados</h3>
              <p className="widget-value">{kpis.total_users}</p>
            </div>
            <div className="widget">
              <h3>Gastos Totales</h3>
              <p className="widget-value">${kpis.total_expenses.toLocaleString('es-AR')}</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default AdminDashboardPage;