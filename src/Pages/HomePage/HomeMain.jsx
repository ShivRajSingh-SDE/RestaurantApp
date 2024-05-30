import React, { useEffect, useState } from "react";
import Home from "./Home";
import HomeWho from "./HomeWho";
import Solution from "./Solution";
import Product from "./Product";
import About from "./Aboutus";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../ContextApi/ProductContextProvider";

const HomeMain = () => {
  const { id } = useParams();
  const { getUser, isLoading, api, user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser(`${api}/auth/${id}`);
      if (userData) {
        const storedUser = localStorage.getItem("userTable");
        if (storedUser) {
          localStorage.removeItem("userTable");
        }
        localStorage.setItem("userTable", JSON.stringify(userData.usertable));
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="flex flex-col">
      <Home />
      <HomeWho />
      <Solution />
      <Product />
      <About />
    </div>
  );
};

export default HomeMain;
