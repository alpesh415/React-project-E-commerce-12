import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/ProductPage.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        
        // Get new arrivals from both the newArrivals array and latest products
        const latestProducts = (data.products || [])
          .sort((a, b) => b.id - a.id) // Sort by ID in descending order (assuming higher IDs are newer)
          .slice(0, 10); // Get the 10 most recent products
        
        // Combine both sources of new arrivals
        const allNewArrivals = [...(data.newArrivals || []), ...latestProducts];
        
        // Remove duplicates based on product ID
        const uniqueNewArrivals = Array.from(
          new Map(allNewArrivals.map(item => [item.id, item])).values()
        );
        
        setProducts(uniqueNewArrivals);
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
                  onClick={() => navigate(`/new-arrivals/${product.id}`)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <span className="new-badge">NEW</span>
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
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

export default NewArrivals;
