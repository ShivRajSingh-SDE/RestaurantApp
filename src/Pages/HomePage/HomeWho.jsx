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
    <div className=" md:h-screen h-auto    ">
      <div className=" max-w-[1300px]     mx-auto">
        <div className="flex justify-center   items-center">
          <h1 className="text-3xl font-thin text-start md:translate-y-10 translate-y-10 mb-4 text-black">
            <span className="border-b border-[#ffffff] me-1 font-extralight">
              Famous{" "}
            </span>
            Cuisine
          </h1>
        </div>
        <br />
        <br />

        <div className="flex flex-wrap justify-center">
          {featureProducts.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative w-[45%] rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 m-2"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover h-full w-full"
              />
              <div className="absolute bottom-0 flex flex-col justify-center w-full items-center bg-black rounded-t-2xl backdrop-filter backdrop-blur-sm  bg-opacity-30 p-4">
                <h2 className="text-center text-white uppercase font-thin mb-2 text-sm ">
                  {item.name}
                </h2>
                <button
                  onClick={() => {
                    navigate("/menu/" + item._id);
                  }}
                  className="p-1 border hover:bg-[#ffffff11] border-white text-white "
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
