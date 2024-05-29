import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeMain from "../Pages/HomePage/HomeMain";
import Login from "../AuthPage/Login";
import Signup from "../AuthPage/Signup";
import { Products } from "../Pages/Product/Products";

const RoutesPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/menu" element={<Products />} />
      </Routes>
    </div>
  );
};

export default RoutesPage;
