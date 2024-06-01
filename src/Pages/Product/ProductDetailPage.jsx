import React, { useEffect } from "react";
import { useAuth } from "../../ContextApi/ProductContextProvider.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Featured from "../Featured/Featured.jsx";
import { useCart } from "../../ContextApi/CartContextProvider.jsx"; // Import useCart
import Home from "../HomePage/Home.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getSingleProduct, isLoading, api, singleProduct } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  console.log("addToCart", addToCart);
  useEffect(() => {
    getSingleProduct(`${api}/products/${id}`);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(singleProduct);
    navigate("/cart");
  };

  return (
    <div>
      <div className="">
        <Home />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4 mt-6">
            <div className="md:flex-1 px-4 flex justify-center items-center">
              <div className="h-auto rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="  w-80 h-80 object-cover rounded-lg"
                  src={singleProduct.imageUrl}
                  alt="Product Image"
                ></img>
              </div>
            </div>

            <div className="md:flex-1 px-4 text-center  w-[95%] mx-auto ">
              <br />
              <br />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-2">
                {singleProduct.name}
              </h2>

              <div className="relative flex flex-col space-y-4 p-6 bg-black rounded-t-2xl backdrop-filter backdrop-blur-sm  bg-opacity-90">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {singleProduct.description}
                  </p>
                </div>

                <hr className="border-gray-300 dark:border-gray-700" />

                <div className=" flex flex-row justify-between">
                  <div className="mb-2 flex items-center">
                    <span className="font-bold text-gray-700 dark:text-gray-400 line-through mr-2">
                      {singleProduct?.price?.regular}
                    </span>
                    <span className="text-2xl font-semibold text-green-600 dark:text-green-400">
                      {singleProduct?.price?.discount}
                    </span>
                  </div>
                  <div className=" top-2 right-2 border border-white rounded-full px-3 py-1 flex items-center shadow-md">
                    <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                      Rating:
                    </span>
                    <span className="text-[#e6c73e]">
                      {singleProduct.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-row items-center justify-center space-x-2 mt-4">
                <span className="font-bold text-gray-700 dark:text-gray-700">
                  Select Size:
                </span>
                <div className="flex items-center mt-2 justify-center">
                  <button className=" border-black border hover:bg-[white] text-black py-2 px-4 rounded-full font-bold mr-2 ">
                    S
                  </button>
                  <button className="border-black border hover:bg-[white] text-black py-2 px-4 rounded-full font-bold mr-2 ">
                    M
                  </button>
                  <button className="border-black border hover:bg-[white] text-black py-2 px-4 rounded-full font-bold mr-2 ">
                    L
                  </button>
                </div>
              </div>

              <div className=" flex flex-row mt-6">
                <button
                  className="w-full border-black border hover:bg-[white] text-black py-2 px-4 rounded-full font-bold "
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="max-w-[80%] mx-auto">
        <h1 className="text-3xl font-thin text-center mb-10 text-black">
          <span className="border-b border-[#000000] me-1 font-extralight">
            Famous{" "}
          </span>
          Cuisine
        </h1>
        <div>
          <Featured />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
