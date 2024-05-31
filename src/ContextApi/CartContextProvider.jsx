import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the cart
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Sync cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load cart items from localStorage only once when the CartProvider mounts
  useEffect(() => {
    const handleStorageChange = () => {
      const localStorageItems = localStorage.getItem("cartItems");
      if (localStorageItems) {
        const parsedItems = JSON.parse(localStorageItems);
        if (JSON.stringify(parsedItems) !== JSON.stringify(cartItems)) {
          // If the localStorage items differ from the current state, ignore changes
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const incrementQuantity = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
