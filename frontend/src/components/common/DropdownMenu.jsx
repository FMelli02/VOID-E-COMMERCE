import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('menswear');

  const handleCategoryClick = (e, category) => {
    e.preventDefault(); // Para que no navegue al hacer click en la categoría principal
    setActiveCategory(category);
  };

  const handleLinkClick = () => {
    onClose(); // Cierra el menú cuando se hace click en un link de producto
  };

  return (
    <>
      {/* El overlay para oscurecer el fondo */}
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      
      <aside className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        <div className="dropdown-header">
            <Link to="/" className="dropdown-logo" onClick={handleLinkClick}>VOID</Link>
            {/* El botón de cerrar ahora vive acá adentro */}
            <button className="close-btn" onClick={onClose}>
                <span></span>
                <span></span>
            </button>
        </div>
        
        <div className="dropdown-content">
          <div className="menu-categories">
            <nav className="dropdown-nav-left">
              <ul>
                <li>
                  <a href="#" 
                     onClick={(e) => handleCategoryClick(e, 'menswear')}
                     className={`category-link ${activeCategory === 'menswear' ? 'active-category' : ''}`}>
                    MENSWEAR
                  </a>
                </li>
                <li>
                  <a href="#" 
                     onClick={(e) => handleCategoryClick(e, 'womenswear')}
                     className={`category-link ${activeCategory === 'womenswear' ? 'active-category' : ''}`}>
                    WOMENSWEAR
                  </a>
                </li>
              </ul>
            </nav>

            <div className="dropdown-nav-right">
              {/* Submenú para Hombres */}
              <ul className={`submenu ${activeCategory === 'menswear' ? 'active-submenu' : ''}`}>
                <li><Link to="/shop?category=hoodies" onClick={handleLinkClick}>HOODIES</Link></li>
                <li><Link to="/shop?category=jackets" onClick={handleLinkClick}>JACKETS</Link></li>
                <li><Link to="/shop?category=shirts" onClick={handleLinkClick}>SHIRTS</Link></li>
                <li><Link to="/shop?category=pants" onClick={handleLinkClick}>PANTS</Link></li>
              </ul>
              {/* Submenú para Mujeres */}
              <ul className={`submenu ${activeCategory === 'womenswear' ? 'active-submenu' : ''}`}>
                <li><Link to="/shop?category=dresses" onClick={handleLinkClick}>DRESSES</Link></li>
                <li><Link to="/shop?category=tops" onClick={handleLinkClick}>TOPS</Link></li>
                <li><Link to="/shop?category=skirts" onClick={handleLinkClick}>SKIRTS</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="dropdown-footer">
              <div className="footer-images">
                  <div className="footer-image left">
                      <img src="/img/dropdownIzquierda.png" alt="Camino sinuoso" />
                  </div>
                   <div className="footer-image right">
                      <img src="/img/dropdownDerecha.png" alt="Autopista de noche" />
                  </div>
              </div>
              <span className="footer-text">THE VOID AWAITS</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DropdownMenu;