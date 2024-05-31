import React, { useEffect } from "react";
import Home from "./Home";
import HomeWho from "./HomeWho";
import Solution from "./Solution";
import Product from "./Product";
import About from "./Aboutus";
import { useParams } from "react-router-dom";
import { useUser } from "../../ContextApi/UserContextProvider";

const HomeMain = () => {
  const { id } = useParams();
  const { getUser, api, user } = useUser();
  console.log("user", user);

  useEffect(() => {
    const fetchUserData = async () => {
      await getUser(`${api}/auth/${id}`);
    };

    fetchUserData();
  }, [id, api]);

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
