import React, { useEffect } from "react";
import Home from "./Home";
import HomeWho from "./HomeWho";
import Solution from "./Solution";
import Product from "./Product";
import About from "./Aboutus";
import { useParams } from "react-router-dom";
import { useAuth } from "../../ContextApi/ProductContextProvider";

const HomeMain = () => {
  const { id } = useParams();
  const { getUser, isLoading, api, user } = useAuth();
  console.log("home ", user);
  useEffect(() => {
    const fetchUserData = async () => {
      await getUser(`${api}/auth/${id}`);
    };

    fetchUserData();
  }, [id, api]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      console.log("User data fetched and updated:", user);
      const storedUser = localStorage.getItem("userTable");
      if (storedUser) {
        localStorage.removeItem("userTable");
      }
    }
  }, [user]);

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
