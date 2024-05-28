import React, { useState, useEffect } from "react";
import img1 from "./Assets/Product1.png";
import img2 from "./Assets/Product2.png";
import img3 from "./Assets/Product3.png";
import img4 from "./Assets/Product4.png";
import img5 from "./Assets/Product5.png";
import { Navigate } from "react-router-dom";

const Product = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = [
    {
      image: img1,
      name: "Burger Supreme",
      description:
        "Indulge in our Burger Supreme, a towering masterpiece of succulent beef, melted cheese, crisp lettuce, and tangy pickles, all nestled between two fluffy buns. Savor the rich flavors and juicy goodness with every bite.",
    },
    {
      image: img2,
      name: "Chicken Burger Deluxe",
      description:
        "Treat yourself to our Chicken Burger Deluxe, featuring tender, seasoned chicken breast, topped with creamy mayo, fresh tomato slices, and crunchy lettuce. It's a delightful combination of flavors and textures that will leave you craving for more.",
    },
    {
      image: img3,
      name: "Healthy Diet Class Cuisine",
      description:
        "Discover our Healthy Diet Class Cuisine, meticulously crafted to satisfy your taste buds while keeping your health goals in mind. Enjoy wholesome ingredients, vibrant flavors, and guilt-free indulgence in every bite.",
    },
    {
      image: img4,
      name: "Delicious Indian Feast",
      description:
        "Embark on a culinary journey through India with our Delicious Indian Feast. From aromatic curries to flavorful biryanis, experience the rich diversity and authenticity of Indian cuisine right at your fingertips.",
    },
    {
      image: img5,
      name: "Coffee Delights",
      description:
        "Start your day on a refreshing note with our Coffee Delights. Whether you prefer a classic espresso or a creamy latte, our expertly crafted coffee blends are sure to awaken your senses and brighten your day.",
    },
  ];
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const nextSlide = () => {
    clearInterval(intervalId);
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    clearInterval(intervalId);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col justify-center items-stretch max-w-[90%] mx-auto w-full">
      <br />
      <br />
      <div className="flex justify-center  flex-row items-center mt-10">
        <h1 className="text-5xl font-thin text-center mb-4 text-white">
          <span className="border-b border-[#ffffff] me-1 font-extralight">
            Famous{" "}
          </span>
          Cuisine
        </h1>
      </div>
      <br />
      <br />
      <br />

      <div className="flex justify-center">
        <div className="w-[50%] flex justify-center items-center  rounded-2xl drop-shadow-2xl shadow-2xl bg-[#ffffff] shadow-[#ffffff44] backdrop-filter backdrop-blur-lg bg-opacity-40">
          <div className="p-6 flex justify-center items-center flex-col">
            <h3 className="text-white text-5xl font-bold mb-10">
              {products[currentIndex].name}
            </h3>
            <p className="text-white  text-center font-serif text-3xl">
              {products[currentIndex].description}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-[50%] items-center">
          <div className="w-full flex justify-end space-x-3 mb-6 items-center ">
            <button
              className="  border border-white text-white hover:bg-[#ffffff0a] p-3  rounded "
              onClick={prevSlide}
            >
              Previous
            </button>
            <button
              className=" border border-white text-white hover:bg-[#ffffff0a] p-3  rounded"
              onClick={nextSlide}
            >
              Next
            </button>
          </div>

          <div className="flex justify-center items-center flex-grow cursor-pointer">
            <div className="relative rounded-md overflow-hidden transform transition-transform scale-105">
              <img
                src={products[currentIndex].image}
                alt="Product"
                className="object-cover w-full h-full"
                onClick={() => {
                  window.location.href = "/service";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
