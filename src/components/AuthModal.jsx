import React, { useState } from 'react';
import '../styles/components/AuthModal.css';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    acceptTerms: false,
    receiveOffers: false
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      // Login
      const result = login(formData.email, formData.password);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setError(result.message);
      }
    } else {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (!formData.acceptTerms) {
        setError('Please accept the terms and conditions');
        return;
      }

      const result = signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            email: formData.email,
            password: '',
            confirmPassword: '',
            name: '',
            acceptTerms: false,
            receiveOffers: false
          });
          setSuccess('');
          setError('');
        }, 2000);
      } else {
        setError(result.message);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      acceptTerms: false,
      receiveOffers: false
    });
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-modal-content">
          {/* Left Side - Branding */}
          <div className="auth-modal-left">
            <div className="auth-branding">
              <img 
                src="https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200" 
                alt="Indian Terrain" 
                className="auth-logo"
              />
              <h2>Click. Pick. Shop. Repeat.</h2>
              
              <div className="auth-features">
                <div className="auth-feature">
                  <div className="feature-icon">🛍️</div>
                  <p>Fast hassle free shopping</p>
                </div>
                <div className="auth-feature">
                  <div className="feature-icon">✨</div>
                  <p>Explore NEW drops</p>
                </div>
                <div className="auth-feature">
                  <div className="feature-icon">🔒</div>
                  <p>100% secure & spam free</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-modal-right">
            <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Welcome back! Please login to your account.' 
                : 'Create an account to get started.'}
            </p>

            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="form-checkboxes">
                {!isLogin && (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                    <span>I agree to the Terms and Conditions</span>
                  </label>
                )}
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="receiveOffers"
                    checked={formData.receiveOffers}
                    onChange={handleChange}
                  />
                  <span>Send me offers and updates</span>
                </label>
              </div>

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button className="auth-google-btn">
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Continue with Google
            </button>

            <p className="auth-toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleMode} className="auth-toggle-btn">
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>

            {isLogin && (
              <p className="auth-forgot">
                <a href="#forgot">Forgot Password?</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
