import React from "react";

function Cards(props) {
  console.log("cards------", props);
  return (
    <>
      <div className="flex flex-col justify-center items-center  ">
        <div
          key={props.id || null}
          className="flex flex-col justify-center items-center"
        >
          <img
            src={props.image}
            alt={props.title}
            className=" object-cover h-[20vh] object-center"
          />
          <div className="mt-5 text-3xl flex flex-col justify-center items-center">
            <h2 className="text-center text-[#ffffff]  uppercase font-thin mb-2">
              {props.name}
            </h2>
            <button className=" p-2 border hover:bg-[#ffffff11] border-white text-white mt-5">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cards;
