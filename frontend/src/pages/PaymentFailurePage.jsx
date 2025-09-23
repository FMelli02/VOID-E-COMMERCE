import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailurePage = () => {
  return (
    <div className="payment-status-page">
      <div className="status-icon failure">✕</div>
      <h1>Pago Rechazado</h1>
      <p>Hubo un problema al procesar tu pago. Por favor, intentá con otro medio de pago.</p>
      <Link to="/cart" className="status-button">Volver al Carrito</Link>
    </div>
  );
};

export default PaymentFailurePage;