import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const context = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if context is missing
  if (!context) {
    return <div>Error: StoreContext not available. Please ensure the provider is correctly configured.</div>;
  }

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = context;
  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 2;
  const finalTotal = totalAmount + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {food_list && Array.isArray(food_list) ? (
          food_list.map((item) =>
            cartItems[item._id] > 0 ? (
              <div key={item._id} className="cart-items-item">
                <img src={`${url}/uploads/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ) : null
          )
        ) : (
          <p>No items in cart.</p>
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${finalTotal.toFixed(2)}</b>
          </div>
        </div>

        <button
          type="button"
          disabled={totalAmount === 0}
          onClick={() => navigate('/order')}
        >
          Proceed To Checkout
        </button>
      </div>

      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
