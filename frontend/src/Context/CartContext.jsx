// src/Context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const totalAmount = Object.values(cartItems).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
