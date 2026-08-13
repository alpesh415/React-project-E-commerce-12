import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import VideoGallery from '../components/VideoGallery';
import FlyingOffShelf from '../components/FlyingOffShelf';
import Products from '../components/Products';
import Lookbook from '../components/Lookbook';
import Footer from '../components/Footer';
import '../styles/pages/Homepage.css';
import BannerImg from '../components/BannerImg';

const Homepage = () => {
  const [heroData, setHeroData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [flyingOffShelf, setFlyingOffShelf] = useState([]);
  const [lookbookData, setLookbookData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data from local JSON file
        const response = await fetch('/data.json');
        const data = await response.json();

        setHeroData(data.hero);
        setCategories(data.categories);
        setProducts(data.products);
        setFlyingOffShelf(data.flyingOffShelf || []);
        setLookbookData(data.lookbook);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <Header />
      <Hero />
      <Categories />
      <VideoGallery />
      {/* <Products products={products} /> */}
      <BannerImg />
      <FlyingOffShelf products={flyingOffShelf} />
      <Lookbook lookbookData={lookbookData} />
      <Footer />
    </div>
  );
};

export default Homepage;
