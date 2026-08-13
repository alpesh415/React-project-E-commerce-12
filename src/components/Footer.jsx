import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';
import { Phone, Mail, Truck, RefreshCw, Shield, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Popular Searches */}
      <div className="popular-searches">
        <p>
          <strong>Popular Searches:</strong> Jeans | Jackets | T-Shirts | Shirts | Shorts | Trousers | Sweatshirts | Polo T-Shirts
        </p>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <h2>Join Indian Terrain Club</h2>
        <p>Sign up to receive our newsletter and exclusive offers.</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Footer Main Content */}
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <Phone size={16} />
              <span>+91 999 090 4272</span>
            </li>
            <li>
              <Mail size={16} />
              <span>support@indianterrain.com</span>
            </li>
            <li className="store-locator">Store Locator</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About Indian Terrain</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#investor">Investor Information</a></li>
            <li><a href="#news">In the News</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#sitemap">Site Map</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>My Account</h3>
          <ul>
            <li><a href="#profile">My Profile</a></li>
            <li><a href="#order">Order</a></li>
            <li><a href="#wishlist">Wishlist</a></li>
            <li><a href="#track">Track Your Order</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Shop By Category</h3>
          <ul>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/shirts">Shirts</Link></li>
            <li><Link to="/bottom-wear">Bottom Wear</Link></li>
            <li><Link to="/festive-edit">Festive Edit</Link></li>
            <li><Link to="/plus-size">Plus Size</Link></li>
            <li><Link to="/festive-sale">Festive Sale</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#returns">Cancellation, Returns and Refunds</a></li>
            <li><a href="#terms">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Features */}
      <div className="footer-features">
        <div className="feature-item">
          <Truck size={32} />
          <span>Free Delivery</span>
        </div>
        <div className="feature-item">
          <RefreshCw size={32} />
          <span>Easy Returns</span>
        </div>
        <div className="feature-item">
          <Shield size={32} />
          <span>Secure payment</span>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Indian Terrain / All rights reserved</p>
        <div className="social-links">
          <span>Follow Us:</span>
          <a href="#facebook" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#instagram" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#youtube" aria-label="YouTube"><Youtube size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
