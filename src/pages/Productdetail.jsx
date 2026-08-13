// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { myAction } from "./Elec/Action";
// import { useDispatch } from "react-redux";
// import { useAuth } from '../context/AuthContext';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../styles/pages/Productdetail.css';

// export default function HomeDetail() {
//   const [state, setState] = useState({});
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const { id } = useParams();

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useAuth();

//   useEffect(() => {
//     fetch('/data.json')
//       .then((res) => res.json())
//       .then((data) => {
//         let product = null;

//         // Search in main products array first
//         if (data.products) {
//           product = data.products.find(p => p.id === parseInt(id));
//         }

//         // If not found in main products, search in all category arrays
//         if (!product) {
//           const allCategories = ['shirts', 'bottomWear', 'newArrivals', 'festiveEdit', 'plusSize', 'festiveSale', 'flyingOffShelf'];
//           for (const catKey of allCategories) {
//             if (data[catKey]) {
//               product = data[catKey].find(p => p.id === parseInt(id));
//               if (product) break;
//             }
//           }
//         }

//         if (product) {
//           setState(product);
//         } else {
//           console.error("Product not found with ID:", id);
//         }
//       })
//       .catch((err) => console.error("Error fetching:", err));
//   }, [id]);

//   // Generate multiple images (use same image with slight variations for demo)
//   const productImages = [
//     state.image || '',
//     state.image || '',
//     state.image || '',
//     state.image || ''
//   ];

//   function AddToCart() {
//     if (!isAuthenticated) {
//       alert('Please login to add items to cart');
//       return;
//     }
//     console.log("Adding to cart:", state);
//     dispatch(myAction(state));
//     navigate('/cart');
//   }

//   if (!state || !state.name) {
//     return (
//       <div>
//         <Header />
//         <div className="loading-container">
//           <h2>Loading...</h2>
//         </div>
//         <Footer />
//       </div>
//     );
//   }
//   return (
//     <div className="product-detail-page">
//       <Header />
//       <div className="product-detail-container">
//         <div className="breadcrumb">
//           <span onClick={() => navigate('/')}>Home</span> /
//           <span onClick={() => navigate(-1)}> Products</span> /
//           <span> {state.name}</span>
//         </div>
        
//         <div className="product-detail-content">
//           <div className="product-left-section">
//             <div className="product-image-section">
//               <div className="image-thumbnails">
//                 {productImages.map((img, index) => (
//                   <div 
//                     key={index}
//                     className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
//                     onClick={() => setSelectedImage(index)}
//                   >
//                     <img src={img} alt={`${state.name} ${index + 1}`} />
//                   </div>
//                 ))}
//               </div>
//               <div className="main-image-container">
//                 <img 
//                   src={productImages[selectedImage]} 
//                   alt={state.name} 
//                   className="product-main-image" 
//                 />
//               </div>
//             </div>
//           </div>
          
//           <div className="product-info-section">
//             <div className="product-header">
//               <div className="product-category-badge">{state.category}</div>
//               <h1 className="product-name">{state.name}</h1>
//             </div>
            
//             <div className="product-pricing">
//               {state.salePrice ? (
//                 <div className="price-container">
//                   <span className="sale-price">₹{state.salePrice?.toLocaleString() || state.salePrice}</span>
//                   <span className="original-price">₹{state.price?.toLocaleString() || state.price}</span>
//                   {state.discount && (
//                     <span className="discount-badge">{state.discount}% OFF</span>
//                   )}
//                 </div>
//               ) : (
//                 <span className="sale-price">₹{state.price?.toLocaleString() || state.price}</span>
//               )}
//               <p className="tax-info">Inclusive of all taxes</p>
//             </div>

//             <div className="size-selector">
//               <h3>Select Size</h3>
//               <div className="size-options">
//                 {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
//                   <button 
//                     key={size} 
//                     className={`size-button ${selectedSize === size ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <a href="#" className="size-guide-link">Size Guide</a>
//             </div>

//             <div className="quantity-selector">
//               <h3>Quantity</h3>
//               <div className="quantity-controls">
//                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
//                 <span>{quantity}</span>
//                 <button onClick={() => setQuantity(quantity + 1)}>+</button>
//               </div>
//             </div>
            
//             <div className="product-actions">
//               <button className="add-to-cart-button" onClick={AddToCart}>
//                 <span>🛒</span> Add to Cart
//               </button>
//               <button className="buy-now-button" onClick={AddToCart}>
//                 Buy Now
//               </button>
//             </div>

//             <div className="product-features">
//               <div className="feature-item">
//                 <span className="feature-icon">✓</span>
//                 <span>Free Shipping on orders above ₹999</span>
//               </div>
//               <div className="feature-item">
//                 <span className="feature-icon">↻</span>
//                 <span>Easy 30 days return & exchange</span>
//               </div>
//               <div className="feature-item">
//                 <span className="feature-icon">⚡</span>
//                 <span>100% Original Products</span>
//               </div>
//             </div>
            
//             <div className="product-description">
//               <h3>Product Details</h3>
//               <div className="details-content">
//                 <p><strong>Fabric:</strong> Premium Cotton Blend</p>
//                 <p><strong>Fit:</strong> Regular Fit</p>
//                 <p><strong>Pattern:</strong> Solid</p>
//                 <p><strong>Occasion:</strong> Casual & Formal</p>
//                 <p><strong>Care:</strong> Machine Wash</p>
//               </div>
              
//               <h3>Features</h3>
//               <ul className="features-list">
//                 <li>Premium quality fabric for all-day comfort</li>
//                 <li>Breathable and lightweight material</li>
//                 <li>Perfect fit with excellent drape</li>
//                 <li>Easy care and maintenance</li>
//                 <li>Suitable for all occasions</li>
//                 <li>Durable construction for long-lasting wear</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { myAction } from "./Elec/Action";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/pages/Productdetail.css";

export default function HomeDetail() {
  const [state, setState] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        let product = null;

        // Search in main products array first
        if (data.products) {
          product = data.products.find(
            (p) => p.id === parseInt(id, 10)
          );
        }

        // If not found, search in category arrays
        if (!product) {
          const allCategories = [
            "shirts",
            "bottomWear",
            "newArrivals",
            "festiveEdit",
            "plusSize",
            "festiveSale",
            "flyingOffShelf"
          ];

          for (const catKey of allCategories) {
            if (data[catKey]) {
              product = data[catKey].find(
                (p) => p.id === parseInt(id, 10)
              );

              if (product) {
                break;
              }
            }
          }
        }

        if (product) {
          setState(product);
        } else {
          console.error("Product not found with ID:", id);
        }
      })
      .catch((err) =>
        console.error("Error fetching:", err)
      );
  }, [id]);

  // Generate multiple images
  const productImages = [
    state.image || "",
    state.image || "",
    state.image || "",
    state.image || ""
  ];

  const AddToCart = () => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    console.log("Adding to cart:", state);

    dispatch(myAction(state));

    navigate("/cart");
  };

  if (!state || !state.name) {
    return (
      <div>
        <Header />

        <div className="loading-container">
          <h2>Loading...</h2>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      <Header />

      <div className="product-detail-container">

        {/* Breadcrumb */}
        <div className="breadcrumb">

          <span onClick={() => navigate("/")}>
            Home
          </span>

          {" / "}

          <span onClick={() => navigate(-1)}>
            Products
          </span>

          {" / "}

          <span>
            {state.name}
          </span>

        </div>

        <div className="product-detail-content">

          {/* LEFT SECTION */}
          <div className="product-left-section">

            <div className="product-image-section">

              {/* Thumbnails */}
              <div className="image-thumbnails">

                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                  >
                    <img
                      src={img}
                      alt={`${state.name} ${index + 1}`}
                    />
                  </div>
                ))}

              </div>

              {/* Main Image */}
              <div className="main-image-container">

                <img
                  src={productImages[selectedImage]}
                  alt={state.name}
                  className="product-main-image"
                />

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="product-info-section">

            {/* Product Header */}
            <div className="product-header">

              <div className="product-category-badge">
                {state.category}
              </div>

              <h1 className="product-name">
                {state.name}
              </h1>

            </div>

            {/* Pricing */}
            <div className="product-pricing">

              {state.salePrice ? (

                <div className="price-container">

                  <span className="sale-price">
                    ₹
                    {state.salePrice?.toLocaleString() ||
                      state.salePrice}
                  </span>

                  <span className="original-price">
                    ₹
                    {state.price?.toLocaleString() ||
                      state.price}
                  </span>

                  {state.discount && (
                    <span className="discount-badge">
                      {state.discount}% OFF
                    </span>
                  )}

                </div>

              ) : (

                <span className="sale-price">
                  ₹
                  {state.price?.toLocaleString() ||
                    state.price}
                </span>

              )}

              <p className="tax-info">
                Inclusive of all taxes
              </p>

            </div>

            {/* Size */}
            <div className="size-selector">

              <h3>
                Select Size
              </h3>

              <div className="size-options">

                {["S", "M", "L", "XL", "XXL"].map(
                  (size) => (
                    <button
                      type="button"
                      key={size}
                      className={`size-button ${
                        selectedSize === size
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  )
                )}

              </div>

              <button
                type="button"
                className="size-guide-link"
                onClick={() =>
                  alert("Size guide coming soon")
                }
              >
                Size Guide
              </button>

            </div>

            {/* Quantity */}
            <div className="quantity-selector">

              <h3>
                Quantity
              </h3>

              <div className="quantity-controls">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  -
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>

            {/* Actions */}
            <div className="product-actions">

              <button
                type="button"
                className="add-to-cart-button"
                onClick={AddToCart}
              >
                <span>🛒</span>
                Add to Cart
              </button>

              <button
                type="button"
                className="buy-now-button"
                onClick={AddToCart}
              >
                Buy Now
              </button>

            </div>

            {/* Features */}
            <div className="product-features">

              <div className="feature-item">
                <span className="feature-icon">
                  ✓
                </span>

                <span>
                  Free Shipping on orders above ₹999
                </span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">
                  ↻
                </span>

                <span>
                  Easy 30 days return & exchange
                </span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">
                  ⚡
                </span>

                <span>
                  100% Original Products
                </span>
              </div>

            </div>

            {/* Description */}
            <div className="product-description">

              <h3>
                Product Details
              </h3>

              <div className="details-content">

                <p>
                  <strong>Fabric:</strong>{" "}
                  Premium Cotton Blend
                </p>

                <p>
                  <strong>Fit:</strong>{" "}
                  Regular Fit
                </p>

                <p>
                  <strong>Pattern:</strong>{" "}
                  Solid
                </p>

                <p>
                  <strong>Occasion:</strong>{" "}
                  Casual & Formal
                </p>

                <p>
                  <strong>Care:</strong>{" "}
                  Machine Wash
                </p>

              </div>

              <h3>
                Features
              </h3>

              <ul className="features-list">

                <li>
                  Premium quality fabric for all-day
                  comfort
                </li>

                <li>
                  Breathable and lightweight material
                </li>

                <li>
                  Perfect fit with excellent drape
                </li>

                <li>
                  Easy care and maintenance
                </li>

                <li>
                  Suitable for all occasions
                </li>

                <li>
                  Durable construction for
                  long-lasting wear
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}
