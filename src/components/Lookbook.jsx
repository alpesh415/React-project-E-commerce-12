import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Lookbook.css';

const Lookbook = ({ lookbookData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  if (!lookbookData || lookbookData.length === 0) return null;

  const handleItemClick = (link) => {
    // Map subcategory links to main category pages
    const categoryMap = {
      '/collections/checked-shirts': '/shirts',
      '/collections/printed-shirts': '/shirts',
      '/collections/solid-shirts': '/shirts',
      '/collections/striped-shirts': '/shirts',
      '/collections/trousers': '/bottom-wear',
      '/collections/jeans': '/bottom-wear',
      '/collections/joggers': '/bottom-wear',
      '/collections/shorts': '/bottom-wear',
      '/collections/crew-necks': '/new-arrivals',
      '/collections/henleys': '/new-arrivals',
      '/collections/polos': '/new-arrivals',
      '/collections/jackets': '/new-arrivals',
      '/collections/sweaters': '/new-arrivals',
      '/collections/sweatshirts': '/new-arrivals'
    };

    // Get the mapped route or use the original
    const route = categoryMap[link] || link.replace('/collections/', '/');
    navigate(route);
  };

  return (
    <section className="lookbook-section">
      <h1 style={{'textAlign':"center"}}> Look Your Best In
      </h1>
      <div className="lookbook-container">
        <div className="lookbook-tabs">
          {lookbookData.map((section, index) => (
            <button
              key={section.id}
              className={`lookbook-tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {section.category}
            </button>
          ))}
        </div>

        <div className="lookbook-content">
          <div className="lookbook-grid">
            {lookbookData[activeTab].items.map((item) => (
              <div 
                key={item.id} 
                className="lookbook-item"
                onClick={() => handleItemClick(item.link)}
              >
                <div className="lookbook-image">
                  <img src={item.image} alt={item.name} />
                  <div className="lookbook-overlay">
                    <span className="lookbook-name">{item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
