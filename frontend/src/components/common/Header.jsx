import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ isMenuOpen, onToggleMenu }) => {
  const { itemCount } = useContext(CartContext);
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery.trim()}`);
      setSearchQuery(''); 
    }
  };
  
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
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input 
              type="text"
              placeholder="SEARCH"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {!loading && (
            isAuthenticated ? (
              <>
                <Link to="/account" className="nav-account-link">
                  HOLA, {user?.name.toUpperCase()}
                </Link>
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

export default Header;