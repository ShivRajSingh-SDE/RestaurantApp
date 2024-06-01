import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSun } from "react-icons/ai";
import { useCart } from "../../ContextApi/CartContextProvider";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <div className="fixed bottom-0 w-full z-50">
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black rounded-t-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-lg z-50">
        <div className="flex justify-around items-center p-2">
          <div className="flex justify-start -translate-x-4 space-x-2 mr-10">
            <NavLink
              to="/"
              className="nav-link transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl hover:bg-[#ffa600] hover:pb-3 hover:rounded-t-2xl p-3 text-white ease-in-out"
            >
              Home
            </NavLink>
          </div>

          <div className="flex justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <NavLink
              to="/menu"
              className="nav-link transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl bg-[#ffa600] hover:bg-white border-white hover:border-[orange] hover:border hover:-translate-y-3 hover:rotate-180 -translate-y-1 p-3 rounded-full text-black ease-in-out"
            >
              <AiOutlineSun size={30} />
            </NavLink>
          </div>

          <div className="relative flex justify-end space-x-4 ml-5 -translate-x-3">
            <NavLink
              to="/cart"
              className="nav-link transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl hover:bg-[#ffa600] hover:pb-3 hover:rounded-t-2xl p-3 text-white ease-in-out"
              style={{ position: "relative" }}
            >
              Cart
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
