// En frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import DropdownMenu from './components/common/DropdownMenu.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CartPage from './pages/CartPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
import PaymentFailurePage from './pages/PaymentFailurePage.jsx';
import PaymentPendingPage from './pages/PaymentPendingPage.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import AdminProductFormPage from './pages/AdminProductFormPage.jsx';
import AdminProductVariantsPage from './pages/AdminProductVariantsPage.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';
import AdminUsersPage from './pages/AdminUsersPage.jsx';
import AdminOrderDetailPage from './pages/AdminOrderDetailPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import AdminRoute from './components/common/AdminRoute.jsx';
import Chatbot from './components/common/Chatbot.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
  }, [isMenuOpen]);

  return (
    <Router>
      <div className="page-wrapper">
        <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductsPage />} /> {/* <-- 2. Agregar la nueva ruta */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/failure" element={<PaymentFailurePage />} />
          <Route path="/payment/pending" element={<PaymentPendingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/edit/:productId" element={<AdminProductFormPage />} />
            <Route path="products/:productId/variants" element={<AdminProductVariantsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="orders/:orderId" element={<AdminOrderDetailPage />} />
          </Route>

        </Routes>
        
        <Footer />
        <Chatbot />
      </div>
      <DropdownMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </Router>
  );
}

export default App;