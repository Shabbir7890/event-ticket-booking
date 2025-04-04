import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../index.css";

const MockPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, userName, userEmail, eventTitle } = location.state || {};
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true); // Show loading spinner
    setTimeout(() => {
      navigate("/booking-confirmed", {
        state: { id, userName, userEmail, eventTitle },
      });
    }, 2000);
  };

  return (
    <div className="payment-wrapper fade-in">
      <div className="payment-box">
        <h2 className="payment-title">💳 Mock Payment Gateway</h2>
        <p className="payment-detail">Event: <strong>{eventTitle}</strong></p>
        <p className="payment-detail">Name: <strong>{userName}</strong></p>
        <p className="payment-detail">Email: <strong>{userEmail}</strong></p>

        {!processing ? (
          <button className="pay-btn" onClick={handlePayment}>💰 Pay Now</button>
        ) : (
          <div className="loading-spinner"></div>
        )}
      </div>
    </div>
  );
};

export default MockPayment;