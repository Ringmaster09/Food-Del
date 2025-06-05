import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)
const storeContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});
    const addToCart = (itemId) => {
        setCartItems((prev) => {
          if (!prev[itemId]) {
            // Item not in cart, add with count 1
            return { ...prev, [itemId]: 1 };
          } else {
            // Item already in cart, increment count
            return { ...prev, [itemId]: prev[itemId] + 1 };
          }
        });
      };

      const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
      }
      useEffect(()=>{
        console.log(cartItems);
      },[cartItems])
      
const contextValue={
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,

}

return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
)
}
export default storeContextProvider;