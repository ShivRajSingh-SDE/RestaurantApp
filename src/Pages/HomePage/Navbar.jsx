import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  AiOutlineSlackSquare,
  AiOutlineSlack,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";

import { FaSquareFacebook } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div className="md:max-w-[full] mx-auto text-xl   bg-[#000000] shadow-[#78d6e744] z-50  flex justify-between items-center duration-300    p-4 ">
      <div className="ml-5 text-3xl">
        <NavLink
          to="/"
          className="flex flex-row justify-center items-center text-white"
        >
          <h1 className="">Elegance</h1>
        </NavLink>
      </div>

      <div className="">
        <nav className="">
          <ul className="hidden md:flex flex-row justify-center items-center space-x-4 font-sans">
            <NavLink
              to="/"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              Home
            </NavLink>

            <NavLink
              to="/contact"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              Contact
            </NavLink>
            <NavLink
              to="/service"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              Menu
            </NavLink>
            <NavLink
              to="/pricing"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              Pricing
            </NavLink>

            <NavLink
              to="/login"
              className="nav-link hover:scale-105   rounded-xl text-white ease-in-out duration-200"
            >
              Login
            </NavLink>
          </ul>
        </nav>
      </div>

      <div className=" mr-5">
        <nav className="">
          <ul className="hidden md:flex flex-row justify-center items-center space-x-4 font-sans">
            <NavLink
              to="/"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              <FaSquareFacebook />
            </NavLink>

            <NavLink
              to="/contact"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              <AiFillGithub />
            </NavLink>
            <NavLink
              to="/service"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              <AiFillInstagram />
            </NavLink>
            <NavLink
              to="/pricing"
              className="nav-link hover:scale-105 text-[#ffffff]  ease-in-out duration-200"
            >
              Know More
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
