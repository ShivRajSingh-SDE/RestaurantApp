import React from "react";

import img1 from "./Assets/1.png";
import img2 from "./Assets/2.png";
import img3 from "./Assets/3.png";
import { useAuth } from "../../ContextApi/ProductContextProvider";
import { useNavigate } from "react-router-dom";

const HomeWho = () => {
  const { products, isLoading, featureProducts } = useAuth();
  const navigate = useNavigate();

  return (
    <div className=" h-screen  ">
      <br />
      <br />
      <br />
      <br />
      <div className=" max-w-[1300px]  mx-auto">
        <div className="flex justify-center   items-center">
          <h1 className="text-5xl font-thin  mb-4 text-white">
            Costumer Favorites
          </h1>
        </div>
        <br />
        <br />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {featureProducts.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden    transform hover:scale-105 transition duration-300  backdrop-filter backdrop-blur-lg bg-opacity-40"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className=" object-cover object-center"
              />
              <div className="mt-5 text-3xl flex flex-col justify-center items-center">
                <h2 className="text-center text-[#ffffff]  uppercase font-thin mb-2">
                  {item.name}
                </h2>
                <button
                  onClick={() => {
                    navigate("/menu/" + item._id);
                  }}
                  className=" p-2 border hover:bg-[#ffffff11] border-white text-white mt-5"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWho;
