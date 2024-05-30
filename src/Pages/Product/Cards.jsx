import React from "react";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const navigate = useNavigate();
  console.log("cards------", props);
  console.log();
  return (
    <>
      <div className="flex flex-col mb-10  justify-center items-center h-auto   ">
        <div
          key={props.id || null}
          className="flex relative flex-col justify-center items-center rounded-2xl hover:scale-105 duration-300 ease-in-out"
        >
          <div className="relative">
            <img
              src={props.image}
              alt={props.title}
              className="object-cover h-[30vh] object-center rounded-2xl"
            />
            <div className="absolute top-1 left-2 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded">
              {props.rating}
            </div>
          </div>
          <div className="mt-5 absolute md:static bg-[#00000018]  p-1 rounded-2xl  text-3xl flex flex-col justify-center items-center">
            <h2 className="text-center text-[#ffffff] text-xl uppercase font-thin mb-2">
              {props.price}
            </h2>
            <h2 className="text-center text-[#ffffff] uppercase font-thin mb-2">
              {props.name}
            </h2>

            <button
              onClick={() => {
                navigate(`/menu/${props.id}`);
              }}
              className="p-2 border hover:bg-white hover:text-black border-white text-white mt-5"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cards;
