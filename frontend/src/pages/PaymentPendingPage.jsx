import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPendingPage = () => {
  return (
    <div className="payment-status-page">
      <div className="status-icon pending">!</div>
      <h1>Pago Pendiente</h1>
      <p>Tu pago está siendo procesado. Te notificaremos por email cuando se apruebe.</p>
      <Link to="/" className="status-button">Volver al Inicio</Link>
    </div>
  );
};

export default PaymentPendingPage;