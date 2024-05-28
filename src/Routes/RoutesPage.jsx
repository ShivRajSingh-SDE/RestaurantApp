import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeMain from "../Pages/HomePage/HomeMain";
import Navbar from "../Pages/HomePage/Navbar";
import Footer from "../Pages/HomePage/Footer";

const RoutesPage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RoutesPage;
