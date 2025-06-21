import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // replace with your public key

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;

      // Send request to your backend to create checkout session
      const response = await fetch('http://localhost:4000/api/order/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [], // Pass your actual cart items here if needed
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert('Failed to start checkout');
      }
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="place-order" onSubmit={(e) => e.preventDefault()}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() + 2}</b>
          </div>
        </div>

        <button type="button" onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'PROCEED TO PAYMENT'}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
