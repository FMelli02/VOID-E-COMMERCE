import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import DropdownMenu from './components/common/DropdownMenu.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <Router>
      {/* El div page-wrapper ahora solo envuelve el contenido principal */}
      <div className="page-wrapper">
        <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        
        <Footer />
      </div>

      {/* El DropdownMenu ahora vive fuera del page-wrapper para superponerse */}
      <DropdownMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </Router>
  );
}

export default App;