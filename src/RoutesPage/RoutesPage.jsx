import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeMain from "../Pages/HomePage/HomeMain";
import Login from "../AuthPage/Login";
import Signup from "../AuthPage/Signup";
import { Products } from "../Pages/Product/Products";
import ProductDetailPage from "../Pages/Product/ProductDetailPage";
import Cart from "../Pages/Cart/Cart";
import { CartProvider } from "../ContextApi/CartContextProvider";

const RoutesPage = () => {
  return (
    <div>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/:id" element={<HomeMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/menu" element={<Products />} />
          <Route path="/menu/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  );
};

export default RoutesPage;
