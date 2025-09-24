import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  // Mientras chequeamos quién es, mostramos un "cargando"
  if (loading) {
    return <div>Verificando credenciales...</div>;
  }

  // Si está logueado Y tiene el rol de "admin", lo dejamos pasar.
  if (isAuthenticated && user?.role === 'admin') {
    return children;
  }

  // Si no cumple, lo mandamos a la página de login.
  return <Navigate to="/login" replace />;
};

export default AdminRoute;