import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Products.css';

const Products = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button className="quick-view">Quick View</button>
                </div>
                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price-container">
                    {product.salePrice ? (
                      <>
                        <span className="original-price">₹{product.price?.toLocaleString()}</span>
                        <span className="sale-price">₹{product.salePrice?.toLocaleString()}</span>
                        {product.discount && (
                          <span className="discount-badge">{product.discount}% OFF</span>
                        )}
                      </>
                    ) : (
                      <span className="regular-price">₹{product.price?.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </Link>
              <button className="add-to-cart">
                Select Options
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
