import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <nav>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Órdenes</a></li>
            <li><a href="#">Usuarios</a></li>
            <li><a href="#">Métricas</a></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <h1>Bienvenido al Panel de Administrador</h1>
        <p>Desde acá vas a poder controlar toda la magia de VOID.</p>
        
        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Ventas del Día</h3>
            <p className="widget-value">$0</p>
          </div>
          <div className="widget">
            <h3>Nuevos Usuarios</h3>
            <p className="widget-value">0</p>
          </div>
          <div className="widget">
            <h3>Productos sin Stock</h3>
            <p className="widget-value">0</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;