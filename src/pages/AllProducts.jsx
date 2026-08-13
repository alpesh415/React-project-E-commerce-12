// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Products from '../components/Products';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../styles/pages/AllProducts.css';

// const AllProducts = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('/data.json');
//         const data = await response.json();
        
//         // Combine products from different categories
//         const combinedProducts = [
//           ...(data.products || []),
//           ...(data.shirts || []),
//           ...(data.plusSize || []),
//           ...(data.festiveEdit || []),
//           ...(data.festiveSale || []),
//           ...(data.newArrivals || [])
//         ];
        
//         setAllProducts(combinedProducts);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);
  
//   // Get unique categories
//   const categories = ['all', ...new Set(allProducts.map(product => product.category))];

//   // Filter products by active category
//   const filteredProducts = activeCategory === 'all' 
//     ? allProducts 
//     : allProducts.filter(product => product.category === activeCategory);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="all-products-page">
//       <Header />
//       <div className="container">
//         <h1 className="page-title">All Products</h1>
        
//         {/* Category Filter */}
//         <div className="category-filters">
//           {categories.map(category => (
//             <button
//               key={category}
//               className={`category-filter ${activeCategory === category ? 'active' : ''}`}
//               onClick={() => setActiveCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
        
//         {/* Products Grid */}
//         <Products products={filteredProducts} />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AllProducts;







import React, { useState, useEffect } from 'react';
import Products from '../components/Products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/AllProducts.css';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();

        // Combine products from different categories
        const combinedProducts = [
          ...(data.products || []),
          ...(data.shirts || []),
          ...(data.plusSize || []),
          ...(data.festiveEdit || []),
          ...(data.festiveSale || []),
          ...(data.newArrivals || [])
        ];

        setAllProducts(combinedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [
    'all',
    ...new Set(allProducts.map((product) => product.category))
  ];

  // Filter products by active category
  const filteredProducts =
    activeCategory === 'all'
      ? allProducts
      : allProducts.filter(
          (product) => product.category === activeCategory
        );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="all-products-page">
      <Header />

      <div className="container">
        <h1 className="page-title">All Products</h1>

        {/* Category Filter */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-filter ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <Products products={filteredProducts} />
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;