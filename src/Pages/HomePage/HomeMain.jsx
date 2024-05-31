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
  console.log("Home component user:", user);

  useEffect(() => {
    if (id && (!user || Object.keys(user).length === 0)) {
      const fetchUserData = async () => {
        await getUser(`${api}/auth/${id}`);
      };

      fetchUserData();
    }
  }, [id, api, getUser, user]);

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
