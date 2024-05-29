import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductContext from "./ProductContext";

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5454/api/products`);
        setProducts(response.data);
        console.log("response.data -->", response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
