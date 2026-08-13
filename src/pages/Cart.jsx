import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Cart.css';
export default function Cart() {
  const cartItems = useSelector((state) => state.cart || state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(cartItems.map(() => 1));
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  console.log("Cart component - Redux state:", cartItems);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  const removeFromCart = (index) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const applyCoupon = () => {
    // Define available coupon codes
    const coupons = {
      'SAVE10': { type: 'percentage', value: 10, description: '10% off' },
      'SAVE20': { type: 'percentage', value: 20, description: '20% off' },
      'FLAT100': { type: 'fixed', value: 100, description: '₹100 off' },
      'FLAT200': { type: 'fixed', value: 200, description: '₹200 off' },
      'WELCOME': { type: 'percentage', value: 15, description: '15% off for new customers' },
      'URVISH016': { type: 'percentage', value: 25, description: '25% special discount' }
    };

    const coupon = coupons[couponCode.toUpperCase()];

    if (coupon) {
      setAppliedCoupon(coupon);
      let discount = 0;

      if (coupon.type === 'percentage') {
        discount = getTotalPrice() * (coupon.value / 100);
      } else {
        discount = Math.min(coupon.value, getTotalPrice());
      }

      setDiscountAmount(discount);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
      setCouponCode('');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item, index) => {
      const price = item.salePrice || item.price || 0;
      return total + (price * quantities[index]);
    }, 0);

    return Math.max(0, subtotal - discountAmount);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item, index) => {
      const price = item.salePrice || item.price || 0;
      return total + (price * quantities[index]);
    }, 0);
  };

  const getItemTotal = (item, index) => {
    const price = item.salePrice || item.price || 0;
    return price * quantities[index];
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="empty-cart-container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">SHOPPING CART</h1>

        <div className="cart-layout">
          <div className="cart-table-section">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="cart-row">
                    <td className="product-cell">
                      <div className="cart-product-info">
                        <img src={item.image} alt={item.name} className="cart-product-image" />
                        <div className="cart-product-details">
                          <h3>{item.name}</h3>
                          <p>Color: {item.color || 'Dark Wine'}</p>
                          <p>Size: {item.size || 'S'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">
                      {item.salePrice ? (
                        <div className="price-info">
                          <span className="strikethrough">₹{item.price?.toLocaleString()}</span>
                          <span className="sale-price">₹{item.salePrice?.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span>₹{item.price?.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="quantity-cell">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(index, quantities[index] - 1)}>−</button>
                        <input 
                          type="text" 
                          value={quantities[index]} 
                          readOnly
                        />
                        <button onClick={() => updateQuantity(index, quantities[index] + 1)}>+</button>
                      </div>
                    </td>
                    <td className="total-cell">
                      ₹{getItemTotal(item, index).toLocaleString()}
                    </td>
                    <td className="remove-cell">
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(index)}
                      >
                        ⊗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-actions">
              <a href="#" className="wishlist-link">Add More From My Wishlist →</a>
            </div>

            {/* Coupon Code Section */}
            <div className="coupon-section">
              <h3>Have a Coupon Code?</h3>
              {appliedCoupon ? (
                <div className="applied-coupon">
                  <div className="coupon-info">
                    <span className="coupon-code">{appliedCoupon.description}</span>
                    <span className="coupon-savings">Save ₹{discountAmount.toFixed(2)}</span>
                  </div>
                  <button className="remove-coupon-btn" onClick={removeCoupon}>Remove</button>
                </div>
              ) : (
                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input-field"
                  />
                  <button className="apply-coupon-btn" onClick={applyCoupon}>Apply</button>
                </div>
              )}
            </div>
          </div>

          <div className="order-summary-section">
            <div className="order-summary">
              <h2>ORDER SUMMARY</h2>
              
              <div className="summary-details">
                <a href="#" className="bill-details-link">Bill Details</a>

                <div className="summary-line">
                  <span>Item Total</span>
                  <span>₹{getSubtotal().toLocaleString()}</span>
                </div>

                {appliedCoupon && discountAmount > 0 && (
                  <div className="summary-line discount-line">
                    <span>Discount ({appliedCoupon.description})</span>
                    <span className="discount-amount">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>GST (5%)</span>
                  <span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>

                <div className="summary-line total-line">
                  <span>Total</span>
                  <span>₹{(getTotalPrice() + getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <button className="continue-btn" onClick={() => navigate('/address')}>
                Continue  ₹{(getTotalPrice()+getTotalPrice()*0.05).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
