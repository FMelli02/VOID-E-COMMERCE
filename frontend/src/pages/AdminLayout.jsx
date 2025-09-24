import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/products">Productos</Link></li>
            {/* Agregaremos más links acá en el futuro */}
            <li><Link to="#">Órdenes</Link></li>
            <li><Link to="#">Usuarios</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        {/* Outlet es el lugar donde React va a dibujar la página anidada */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;