import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './Components/Footer/Footer';
import LoginPopUP from './Components/LoginPopUp/LoginPopUP';

// Replace this with your actual Stripe public key from Stripe dashboard
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopUP setShowLogin={setShowLogin} />}
      
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order"
            element={
              <Elements stripe={stripePromise}>
                <PlaceOrder />
              </Elements>
            }
          />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
