import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const order = localStorage.getItem('lastOrder');
    if (!order) {
      navigate('/');
      return;
    }

    setOrderData(JSON.parse(order));

    // Clear cart from Redux
    dispatch({ type: 'CLEAR_CART' });

    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Create confetti particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)];
        particle.style.animationDuration = randomInRange(2, 4) + 's';
        document.querySelector('.thank-you-page')?.appendChild(particle);

        setTimeout(() => particle.remove(), 4000);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [navigate, dispatch]);

  if (!orderData) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="thank-you-page">
      <Header />
      <div className="thank-you-container">
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>

        <h1 className="thank-you-title">Thank You for Your Order!</h1>
        <p className="thank-you-subtitle">Your order has been placed successfully</p>

        <div className="order-info-card">
          <div className="order-header">
            <div className="order-id">
              <span className="label">Order ID:</span>
              <span className="value">{orderData.orderId}</span>
            </div>
            <div className="order-date">
              <span className="label">Order Date:</span>
              <span className="value">{formatDate(orderData.date)}</span>
            </div>
          </div>

          <div className="order-details">
            <h3>Order Summary</h3>
            <div className="order-items">
              {orderData.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{(item.salePrice || item.price)?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total Amount:</span>
              <span className="total-amount">₹{orderData.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="delivery-info">
            <h3>Delivery Address</h3>
            <div className="address-box">
              <p className="recipient-name">{orderData.address.fullName}</p>
              <p>{orderData.address.address}</p>
              {orderData.address.landmark && <p>{orderData.address.landmark}</p>}
              <p>{orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}</p>
              <p>Phone: {orderData.address.phone}</p>
            </div>
          </div>

          <div className="payment-info">
            <h3>Payment Method</h3>
            <p className="payment-method">
              {orderData.paymentMethod === 'card' && '💳 Credit/Debit Card'}
              {orderData.paymentMethod === 'upi' && '📱 UPI'}
              {orderData.paymentMethod === 'cod' && '💵 Cash on Delivery'}
            </p>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📧</div>
              <h4>Order Confirmation</h4>
              <p>You will receive an order confirmation email shortly</p>
            </div>
            <div className="step-card">
              <div className="step-icon">📦</div>
              <h4>Processing</h4>
              <p>We'll start processing your order immediately</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🚚</div>
              <h4>Delivery</h4>
              <p>Your order will be delivered within 5-7 business days</p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
          <button className="btn-secondary" onClick={() => window.print()}>
            Print Receipt
          </button>
        </div>

        <div className="support-info">
          <p>Need help? Contact us at <a href="mailto:support@indianterrain.com">support@indianterrain.com</a></p>
          <p>or call us at <a href="tel:+911234567890">+91 123 456 7890</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
