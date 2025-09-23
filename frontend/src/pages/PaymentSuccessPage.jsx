import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
  return (
    <div className="payment-status-page">
      <div className="status-icon success">✓</div>
      <h1>¡Pago Aprobado!</h1>
      <p>Tu compra se ha realizado con éxito. Te enviamos un email con los detalles.</p>
      <Link to="/shop" className="status-button">Seguir Comprando</Link>
    </div>
  );
};

export default PaymentSuccessPage;