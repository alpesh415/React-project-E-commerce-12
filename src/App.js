import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NewArrivals from './pages/NewArrivals';
import Shirts from './pages/Shirts';
import BottomWear from './pages/BottomWear';
import FestiveEdit from './pages/FestiveEdit';
import PlusSize from './pages/PlusSize';
import FestiveSale from './pages/FestiveSale';
import AllProducts from './pages/AllProducts';
import Productdetail from './pages/Productdetail';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/shirts" element={<Shirts />} />
          <Route path="/bottom-wear" element={<BottomWear />} />
          <Route path="/festive-edit" element={<FestiveEdit />} />
          <Route path="/plus-size" element={<PlusSize />} />
          <Route path="/festive-sale" element={<FestiveSale />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/:category/:id" element={<Productdetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
