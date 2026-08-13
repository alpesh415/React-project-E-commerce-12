import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import '../styles/components/Header.css';
import { Search, Heart, User, ShoppingCart, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart || []);
  const cartCount = cartItems.length;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Load all products on mount
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const products = [
          ...(data.newArrivals || []).map(p => ({ ...p, category: 'new-arrivals' })),
          ...(data.shirts || []).map(p => ({ ...p, category: 'shirts' })),
          ...(data.bottomWear || []).map(p => ({ ...p, category: 'bottom-wear' })),
          ...(data.festiveEdit || []).map(p => ({ ...p, category: 'festive-edit' })),
          ...(data.plusSize || []).map(p => ({ ...p, category: 'plus-size' })),
          ...(data.festiveSale || []).map(p => ({ ...p, category: 'festive-sale' }))
        ];
        setAllProducts(products);
      })
      .catch(err => console.error('Error loading products:', err));
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 6)); // Show max 6 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleProductClick = (product) => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate(`/${product.category}/${product.id}`);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-bar')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'}`}>
      {/* Top Banner */}
      <div className="top-banner">
        <p>Shop New Season</p>
      </div>

      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-container">
          <Link to="/" className="logo">
            <div className="logo-text">
            <img src="https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=700" alt="Indian Terrain" />
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="navbar">
        <div className="navbar-container">
          {/* Search Bar */}
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map((product) => (
                  <div
                    key={`${product.category}-${product.id}`}
                    className="search-result-item"
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="search-result-info">
                      <p className="search-result-name">{product.name}</p>
                      <div className="search-result-price">
                        <span className="search-sale-price">₹{product.salePrice?.toLocaleString()}</span>
                        <span className="search-original-price">₹{product.price?.toLocaleString()}</span>
                        {product.discount > 0 && (
                          <span className="search-discount">{product.discount}% OFF</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showSearchResults && searchQuery && searchResults.length === 0 && (
              <div className="search-results-dropdown">
                <div className="no-results">
                  <p>No products found for "{searchQuery}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <Link to="/new-arrivals">NEW ARRIVALS</Link>
            <Link to="/shirts">SHIRTS</Link>
            <Link to="/bottom-wear">BOTTOM WEAR</Link>
            <Link to="/festive-edit">FESTIVE EDIT</Link>
            <Link to="/plus-size">PLUS SIZE</Link>
            <Link to="/festive-sale">FESTIVE SALE</Link>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            <button className="icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              <span className="badge">0</span>
            </button>
            <div className="user-menu-container">
              <button 
                className="icon-btn" 
                aria-label="Account"
                onClick={() => user ? setShowUserMenu(!showUserMenu) : setShowAuthModal(true)}
              >
                <User size={20} />
              </button>
              {user && showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button 
              className="icon-btn cart-btn" 
              aria-label="Cart"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};

export default Header;
