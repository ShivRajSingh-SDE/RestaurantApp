import React from "react";
import Home from "./Home";
import HomeWho from "./HomeWho";
import Solution from "./Solution";
import Product from "./Product";

import About from "./Aboutus";

const HomeMain = () => {
  return (
    <div className=" flex flex-col">
      <Home />
      <HomeWho />
      <Solution />
      <Product />

      <About />
    </div>
  );
};

export default HomeMain;
