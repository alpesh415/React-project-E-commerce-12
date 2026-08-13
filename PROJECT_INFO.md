# Indian Terrain Clone - E-commerce Website

A full-featured e-commerce website clone of Indian Terrain built with React and React Router.

## Features

### Pages
- **Homepage** - Hero banner, categories, featured products, lookbook sections
- **Login/Signup** - Authentication pages with form validation
- **Product Listing** - All products and category-filtered products
- **Product Detail** - Detailed product view with size/color selection
- **Shopping Cart** - Add to cart, quantity management, checkout
- **About** - Company information and values
- **Contact** - Contact form and company details

### Functionality
- ✅ React Router for navigation
- ✅ Authentication (Login/Signup) with localStorage
- ✅ Product browsing by category
- ✅ Product detail pages with image gallery
- ✅ Shopping cart functionality
- ✅ All data fetched from JSON files
- ✅ Responsive design
- ✅ User session management

## Data Files (in /public/data/)
- `categories.json` - Product categories
- `products.json` - Featured products for homepage
- `allproducts.json` - Complete product catalog
- `users.json` - User authentication data
- `hero.json` - Hero banner content
- `lookbook.json` - Lookbook section data

## Routes
- `/` - Homepage
- `/login` - Login page
- `/signup` - Signup page
- `/products` - All products
- `/products/:category` - Category filtered products
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/about` - About page
- `/contact` - Contact page

## Demo Credentials
- Email: demo@indianterrain.com
- Password: demo123

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Technologies Used
- React 19.2.0
- React Router DOM 6.x
- CSS3 (Custom styling)
- LocalStorage for state management

## Project Structure
```
src/
├── components/        # Reusable components
│   ├── Header.js
│   ├── Hero.js
│   ├── Categories.js
│   ├── Products.js
│   ├── Lookbook.js
│   └── Footer.js
├── pages/            # Page components
│   ├── Homepage.js
│   ├── Login.js
│   ├── Signup.js
│   ├── ProductList.js
│   ├── ProductDetail.js
│   ├── Cart.js
│   ├── About.js
│   └── Contact.js
└── App.js           # Main app with routing

public/
└── data/            # JSON data files
    ├── categories.json
    ├── products.json
    ├── allproducts.json
    ├── users.json
    ├── hero.json
    └── lookbook.json
```

## Features Implemented
1. **Authentication System** - Login/Signup with validation
2. **Product Catalog** - Browse all products or filter by category
3. **Product Details** - View product info, select size/color, add to cart
4. **Shopping Cart** - Manage cart items, update quantities
5. **Responsive Design** - Works on desktop and mobile
6. **Navigation** - Full routing with React Router
7. **Data-Driven** - All content from JSON files

## Development Notes
- No external UI libraries used (pure CSS)
- Simple localStorage for cart and user session
- Clean component structure
- Responsive and mobile-friendly
