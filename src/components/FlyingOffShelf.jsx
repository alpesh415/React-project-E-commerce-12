import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/FlyingOffShelf.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FlyingOffShelf = ({ products }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => {
      checkScrollPosition();
    }, 300);
  };

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  return (
    <section className="flying-off-shelf-section">
      <div className="flying-container">
        <h2 className="flying-title">Flying Off The Shelf</h2>

        <div className="carousel-wrapper">
          {showLeftArrow && (
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div
            className="products-carousel"
            ref={scrollRef}
            onScroll={checkScrollPosition}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flying-product-card"
                onClick={() => navigate(`/${product.category || 'products'}/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flying-product-image">
                  <img src={product.image} alt={product.name} />
                  {product.discount > 0 && (
                    <div className="discount-badge">{product.discount}%</div>
                  )}
                </div>
                <div className="flying-product-info">
                  <h3 className="flying-product-name">{product.name}</h3>
                  <div className="flying-product-pricing">
                    <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="sale-price">₹{product.salePrice.toLocaleString()}</span>
                  </div>
                  <p className="gst-savings">{product.gstSavings}</p>
                </div>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlyingOffShelf;
