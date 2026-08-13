import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/ProductPage.css';

const PlusSize = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        
        // Get plus size products from both the plusSize array and filtered products array
        const plusSizeFromProducts = (data.products || []).filter(
          product => product.name && product.name.toLowerCase().includes('plus size')
        );
        
        // Combine both sources of plus size data
        const allPlusSize = [...(data.plusSize || []), ...plusSizeFromProducts];
        
        // Remove duplicates based on product ID
        const uniquePlusSize = Array.from(
          new Map(allPlusSize.map(item => [item.id, item])).values()
        );
        
        setProducts(uniquePlusSize);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-page">
        <Header />
        <div className="page-content">
          <div className="loading-container">
            <p>Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page">
      <Header />
      <div className="page-content">
        <div className="products-layout">
          
          <main className="products-main">
            <div className="products-header">
              <div className="sort-by">
                <label>Sort by:</label>
                <select>
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => navigate(`/plus-size/${product.id}`)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <span className="new-badge">NEW</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-pricing">
                      <span className="sale-price">₹{product.salePrice?.toLocaleString()}</span>
                      <span className="original-price">₹{product.price?.toLocaleString()}</span>
                      {product.discount > 0 && (
                        <span className="discount-percent">({product.discount}% OFF)</span>
                      )}
                    </div>
                    <p className="gst-savings">Save ₹{Math.round((product.price - product.salePrice) * 0.12)} on GST</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlusSize;
