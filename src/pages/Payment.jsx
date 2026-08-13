import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const cartItems = useSelector((state) => state.cart || []);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please login to continue');
      navigate('/');
      return;
    }

    const savedAddress = localStorage.getItem('shippingAddress');
    if (!savedAddress) {
      alert('Please add shipping address first');
      navigate('/address');
      return;
    }

    setAddress(JSON.parse(savedAddress));
  }, [isAuthenticated, navigate]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.price || 0;
      return total + price;
    }, 0);
  };

  const getGST = () => {
    return getTotalPrice() * 0.05;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getGST();
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.replace(/\s/g, '').length > 16) return;
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePayment = () => {
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    } else if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!cardDetails.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!cardDetails.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (cardDetails.expiryDate.length !== 5) {
        newErrors.expiryDate = 'Invalid expiry date';
      }
      if (!cardDetails.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (cardDetails.cvv.length !== 3) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!upiId.includes('@')) {
        newErrors.upiId = 'Invalid UPI ID format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (validatePayment()) {
      // Save order details
      const orderData = {
        orderId: 'ORD' + Date.now(),
        items: cartItems,
        address: address,
        paymentMethod: paymentMethod,
        total: getFinalTotal(),
        date: new Date().toISOString()
      };

      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart and address
      localStorage.removeItem('shippingAddress');
      
      // Navigate to thank you page
      navigate('/thank-you');
    }
  };

  if (!address) return null;

  return (
    <div className="payment-page">
      <Header />
      <div className="payment-container">
        <div className="checkout-progress">
          <div className="progress-step completed">
            <div className="step-number">✓</div>
            <span>Address</span>
          </div>
          <div className="progress-line active"></div>
          <div className="progress-step active">
            <div className="step-number">2</div>
            <span>Payment</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <div className="step-number">3</div>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="payment-layout">
          <div className="payment-left">
            <div className="payment-section">
              <h2>Select Payment Method</h2>
              
              {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}

              <div className="payment-methods">
                <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-icon">💳</span>
                    <span className="option-text">Credit/Debit Card</span>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-icon">📱</span>
                    <span className="option-text">UPI</span>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-icon">💵</span>
                    <span className="option-text">Cash on Delivery</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-form">
                  <h3>Enter Card Details</h3>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardDetails.cardName}
                      onChange={handleCardChange}
                      placeholder="Name on card"
                    />
                    {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                    </div>

                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                      />
                      {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="upi-form">
                  <h3>Enter UPI ID</h3>
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        if (errors.upiId) setErrors(prev => ({ ...prev, upiId: '' }));
                      }}
                      placeholder="yourname@upi"
                    />
                    {errors.upiId && <span className="error-text">{errors.upiId}</span>}
                  </div>
                </div>
              )}
            </div>

            <div className="delivery-address">
              <h3>Delivery Address</h3>
              <div className="address-card">
                <p className="address-name">{address.fullName}</p>
                <p>{address.address}</p>
                {address.landmark && <p>{address.landmark}</p>}
                <p>{address.city}, {address.state} - {address.pincode}</p>
                <p>Phone: {address.phone}</p>
                <button className="change-address-btn" onClick={() => navigate('/address')}>
                  Change Address
                </button>
              </div>
            </div>
          </div>

          <div className="payment-right">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">₹{(item.salePrice || item.price)?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>GST (5%)</span>
                  <span>₹{getGST().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{getFinalTotal().toLocaleString()}</span>
                </div>
              </div>

              <button className="pay-now-btn" onClick={handlePayment}>
                {paymentMethod === 'cod' ? 'Place Order' : `Pay ₹${getFinalTotal().toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
