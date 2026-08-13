import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Categories.css';

const Categories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 1,
      name: 'SHIRTS',
      link: '/shirts',
      image: 'https://www.indianterrain.com/cdn/shop/files/Shirts_cat_20082025.jpg?v=1755693293&width=600'
    },
    {
      id: 2,
      name: 'T-SHIRTS',
      link: '/new-arrivals',
      image: 'https://www.indianterrain.com/cdn/shop/files/T-shirts_cat_20082025.jpg?v=1755693293&width=600'
    },
    {
      id: 3,
      name: 'TROUSERS',
      link: '/bottom-wear',
      image: 'https://www.indianterrain.com/cdn/shop/files/Trousers_cat_20082025.jpg?v=1755693293&width=600'
    },
    {
      id: 4,
      name: 'DENIMS',
      link: '/bottom-wear',
      image: 'https://www.indianterrain.com/cdn/shop/files/Denims_cat_20082025.jpg?v=1755693294&width=600'
    }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Shop By Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => navigate(category.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-label">
                <h3>{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
