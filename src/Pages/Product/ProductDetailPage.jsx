import React, { useEffect, useState } from "react";
import { useAuth } from "../../ContextApi/ProductContextProvider.jsx";
import { useParams } from "react-router-dom";
import Featured from "../Featured/Featured.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { getSingleProduct, api, singleProduct } = useAuth();
  console.log("data for singlepage", singleProduct);

  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSingleProduct(`${api}/products/${id}`);
  }, [id, api, getSingleProduct]);

  useEffect(() => {
    if (singleProduct && singleProduct.tag && singleProduct.tag.length > 0) {
      fetchSimilarProducts(singleProduct.tag[0]);
    }
  }, [singleProduct]);

  const fetchSimilarProducts = async (tag) => {
    setIsLoadingSimilar(true);
    try {
      const response = await fetch(`${api}/products/tag/${tag}`);
      const data = await response.json();
      if (response.ok) {
        setSimilarProducts(data.data);
      } else {
        setError("Failed to fetch similar products");
      }
    } catch (error) {
      setError("Failed to fetch similar products");
    } finally {
      setIsLoadingSimilar(false);
    }
  };

  return (
    <div>
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4 mt-6">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={singleProduct.imageUrl}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <br />
              <br />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {singleProduct.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {singleProduct.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4 space-x-1">
                  <span className="font-bold text-gray-700 line-through dark:text-gray-300">
                    {singleProduct?.price?.regular}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {singleProduct?.price?.discount}
                  </span>
                </div>
                <div className="space-x-1">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Rating:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {singleProduct.rating}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {singleProduct.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="max-w-[80%] mx-auto">
        <h1 className="text-5xl font-thin text-start mb-4 text-white">
          <span className="border-b border-[#ffffff] me-1 font-extralight">
            Famous{" "}
          </span>
          Cuisine
        </h1>

        <div>
          <Featured />
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className="max-w-[80%] mx-auto">
        <h1 className="text-5xl font-thin text-start mb-4 text-white">
          <span className="border-b border-[#ffffff] me-1 font-extralight">
            Similar{" "}
          </span>
          Products
        </h1>
        {isLoadingSimilar ? (
          <p className="text-white">Loading similar products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-900 font-bold">
                    ${product.price.discount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
