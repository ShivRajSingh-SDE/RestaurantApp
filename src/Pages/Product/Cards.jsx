import React from "react";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mb-10 justify-center items-center h-auto w-full md:w-1/2 lg:w-1/3 p-2">
      <div
        key={props.id || null}
        className="relative flex flex-col justify-center items-center rounded-2xl hover:scale-105 transform transition duration-300 ease-in-out shadow-lg w-full"
      >
        <div className="relative w-full">
          <img
            src={props.image}
            alt={props.title}
            className="object-cover h-[30vh] object-center rounded-2xl w-full"
          />
          <div className="absolute top-1 left-2 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded shadow-md">
            {props.rating}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 rounded-b-2xl">
            <h2 className="text-center text-lg uppercase font-light mb-1">
              {props.price}
            </h2>
            <h2 className="text-center text-base uppercase font-thin mb-2">
              {props.name}
            </h2>
            <button
              onClick={() => {
                navigate(`/menu/${props.id}`);
              }}
              className="p-1 border w-full text-sm hover:bg-white hover:text-black border-white text-white rounded-lg transform transition duration-300 ease-in-out shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
