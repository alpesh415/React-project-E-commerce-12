import React, { useState, useEffect } from 'react';
import '../styles/components/Hero.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      backgroundImage: 'https://www.indianterrain.com/cdn/shop/files/Diwali-hero-desk_07102025.jpg?v=1759816053 ',
      imageOnly: true
    },
    {
      id: 2,
      backgroundImage: 'https://www.indianterrain.com/cdn/shop/files/GST_WEB_22092025.jpg?v=1758522684&width=2000',
      imageOnly: true
    },
    {
      id: 3,
      backgroundImage: 'https://www.indianterrain.com/cdn/shop/files/kk-new-arrivals-updated-desk_03092025.jpg?v=1756891471&width=2000',
      imageOnly: true
    },
    {
      id: 4,
      backgroundImage: 'https://www.indianterrain.com/cdn/shop/files/fes_desk_19092025.jpg?v=1758292869&width=2000',
      imageOnly: true
    },
    {
      id: 5,
      backgroundImage: 'https://www.indianterrain.com/cdn/shop/files/extend_plus_collection_12082025.png?v=1754976581&width=2000',
      imageOnly: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {/* Slides */}
        <div className="slides-wrapper">
          {slides.map((s, index) => (
            <div
              key={s.id}
              className={`slide ${index === currentSlide ? 'active' : ''} ${s.imageOnly ? 'image-only' : ''}`}
              style={{ backgroundImage: `url(${s.backgroundImage})` }}
            >
              {!s.imageOnly && (
                <div className="slide-overlay">
                  <div className="slide-content">
                    {/* Left Content */}
                    <div className="slide-left">
                      {s.logo && <img src={s.logo} alt="Indian Terrain" className="slide-logo" />}
                      {s.leftContent?.title && <h1 className="slide-title">{s.leftContent.title}</h1>}
                      {s.leftContent?.subtitle && (
                        <h2 className="slide-subtitle">
                          {s.leftContent.subtitle}
                          <br />
                          {s.leftContent.subtitle2}
                        </h2>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="slide-divider"></div>

                    {/* Right Content */}
                    <div className="slide-right">
                      {s.rightContent?.map((item, idx) => (
                        <div key={idx} className="slide-info-item">
                          <p className="info-text">{item.text}</p>
                          <p className="info-subtext">{item.subtext}</p>
                          {idx < s.rightContent.length - 1 && <div className="info-divider"></div>}
                        </div>
                      ))}
                      {s.ctaText && <button className="slide-cta">{s.ctaText}</button>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="slider-arrow slider-arrow-left" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={32} />
        </button>
        <button className="slider-arrow slider-arrow-right" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={32} />
        </button>

        {/* Dots Navigation */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      <img className='welcome-banner' src="https://www.indianterrain.com/cdn/shop/files/welcome-banner-updated-desk-13082025.jpg?v=1755061886" alt="Welcome Banner" />
    </section>
  );
};

export default Hero;
