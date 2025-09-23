// En frontend/src/components/common/DropdownMenu.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- 1. Importar Link

const DropdownMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('menswear');
  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setActiveCategory(category);
  };

  // --- Función para cerrar el menú al hacer clic en un link ---
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* ... (código del overlay y el header del dropdown sin cambios) ... */}
      <aside className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {/* ... */}
        <div className="dropdown-content">
          <div className="menu-categories">
            <nav className="dropdown-nav-left">
              <ul>
                  {/* ... */}
              </ul>
            </nav>
            <nav className="dropdown-nav-right">
              {/* --- 2. Reemplazar <a> por <Link> --- */}
              <ul className={`submenu ${activeCategory === 'womenswear' ? 'active-submenu' : ''}`}>
                <li><Link to="/shop" onClick={handleLinkClick}>DRESSES</Link></li>
                <li><Link to="/shop" onClick={handleLinkClick}>TOPS</Link></li>
                <li><Link to="/shop" onClick={handleLinkClick}>SKIRTS</Link></li>
              </ul>
              <ul className={`submenu ${activeCategory === 'menswear' ? 'active-submenu' : ''}`}>
                <li><Link to="/shop" onClick={handleLinkClick}>HOODIES</Link></li>
                <li><Link to="/shop" onClick={handleLinkClick}>JACKETS</Link></li>
                <li><Link to="/shop" onClick={handleLinkClick}>SHIRTS</Link></li>
                <li><Link to="/shop" onClick={handleLinkClick}>PANTS</Link></li>
              </ul>
            </nav>
          </div>
          {/* ... (código del footer del dropdown sin cambios) ... */}
        </div>
      </aside>
    </>
  );
};

export default DropdownMenu;