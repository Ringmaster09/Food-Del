import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const context = useContext(StoreContext);

  // Safeguard: Check if context is undefined
  if (!context) {
    return <div>Error: StoreContext is not available. Please ensure the provider is set up.</div>;
  }

  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = context;
 const navigate =useNavigate()
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list && Array.isArray(food_list) ? (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index} className='cart-items-item'> {/* Add key prop */}
                 <img src={item.image} alt=""/>
                  
                 
                  <p>{item.name}</p> {/* Title column */}
                  <p>${item.price}</p> {/* Price column */}
                  <p>{cartItems[item._id]}</p> {/* Quantity column */}
                  <p>${item.price * cartItems[item._id]}</p> {/* Total column */}
                  <button onClick={() => removeFromCart(item._id)}>Remove</button> {/* Remove column */}
                </div>
              );
            }
            return null; // Return null for items not in cart
          })
        ) : (
          <p>No items in cart.</p>
        )}
      </div>
       <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()+2}</b>
          </div>
         
        </div>
        <button type="button" onClick={() => navigate('/order')}>Proceed To Checkout</button>
       </div>
       <div className="cart-promocode">
        <div>
          <p>if you have promo code enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
       </div>
    </div>
  );
};

export default Cart