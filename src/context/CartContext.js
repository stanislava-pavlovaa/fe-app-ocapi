import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    if (cart && cart.product_items) {
      const newTotalQuantity = cart.product_items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setTotalQuantity(newTotalQuantity);
    }
  }, [cart]);
  // console.log('cart', cart);

  return (
    <CartContext.Provider value={{ cart, setCart, totalQuantity, setTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
