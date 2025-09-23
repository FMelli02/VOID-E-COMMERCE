// En frontend/src/components/common/Header.jsx

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import DropDownCart from '../products/DropDownCart';

const Navbar = ({ isMenuOpen, onToggleMenu }) => {
  const { itemCount } = useContext(CartContext);
  // Ahora también traemos 'loading' del AuthContext
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-left">
          <button
            className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={onToggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-center">
          <Link to="/" className="logo">VOID</Link>
        </div>
        <div className="nav-right">
          <div className="search-container">
            <label className="search-label">SEARCH</label>
            <div className="search-underline"></div>
          </div>
          <a>LANGUAGE</a>

          {/* --- ACÁ ESTÁ EL ARREGLO --- */}
          {/* Mientras carga, no mostramos nada. Cuando termina... */}
          {!loading && (
            isAuthenticated ? (
              <>
                {/* Usamos 'user?.name' para que no se rompa si 'user' es null */}
                <span>HOLA, {user?.name.toUpperCase()}</span>
                <a onClick={logout} style={{ cursor: 'pointer' }}>LOGOUT</a>
              </>
            ) : (
              <Link to="/login">LOGIN</Link>
            )
          )}
          
          <Link to="/cart">BAG ({itemCount})</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;