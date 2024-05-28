import React from "react";

const Home = () => {
  return (
    <div
      id="imgbg"
      className="h-[95vh] flex justify-center items-center flex-col"
    >
      <br />
      <br />
      <br />
      <h1 className="imgbgh1 text-[90px] text-white font-extrabold">
        Gourmet Delights <br />
        For Every Palate
      </h1>

      <button className=" border mt-4 border-white p-4 text-white hover:scale-105 ease-in-out duration-300 hover:bg-[#ffffff10]">
        Order Now
      </button>
    </div>
  );
};

export default Home;
