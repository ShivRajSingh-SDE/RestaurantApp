import React from "react";

const Home = () => {
  return (
    <div
      id="imgbg"
      className="md:h-[95vh] bg-black  h-[350px] rounded-b-3xl drop-shadow-2xl shadow-2xl shadow-[#00000050]  flex justify-center items-center flex-col"
    >
      <br />
      <br />
      <br />
      <h1 className="imgbgh1 md:text-[90px] text-5xl text-center  text-white font-extrabold">
        Gourmet Delights For Every Palate
      </h1>

      <button className=" border mt-4 border-white p-4 text-white hover:scale-105 ease-in-out duration-300 hover:bg-[#ffffff10]">
        Order Now
      </button>
    </div>
  );
};

export default Home;
