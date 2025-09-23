import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // El estado inicial del token lo leemos del localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  // Cambiamos el estado inicial de loading a true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Si el token es inválido (ej. expiró), lo limpiamos
            console.error("Token inválido o expirado. Limpiando sesión.");
            logout();
          }
        } catch (error) {
          console.error("Error al verificar el token, limpiando sesión:", error);
          logout();
        }
      }
      // Sea cual sea el resultado, terminamos de cargar
      setLoading(false);
    };

    fetchUser();
  }, [token]); // Se ejecuta cada vez que el token cambia

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: !!user, // La autenticación depende de si tenemos un usuario, no solo un token
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* ¡EL CAMBIO CLAVE! Siempre mostramos la app. 
          El resto de los componentes decidirán si mostrar un 'cargando...' o el contenido. */}
      {children}
    </AuthContext.Provider>
  );
};