// En frontend/src/components/common/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        
        <div className="footer-column">
          <h4>SHOP</h4>
          <ul>
            <li><Link to="/shop?category=menswear">Menswear</Link></li>
            <li><Link to="/shop?category=womenswear">Womenswear</Link></li>
            <li><Link to="/shop">All</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>INFO</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>

        <div className="footer-column subscribe-column">
          <h4>JOIN THE VOID</h4>
          <p>Suscribite a nuestro newsletter y sé el primero en enterarte de todo.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Tu email" />
            <button type="submit">→</button>
          </form>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© 2024 VOID. Todos los derechos reservados.</p>
        <div className="footer-social-links">
            <a href="#">INSTAGRAM</a>
            <a href="#">TIKTOK</a>
            <a href="#">X</a>
            <a href="#">FACEBOOK</a>
            <a href="#">SPOTIFY</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;