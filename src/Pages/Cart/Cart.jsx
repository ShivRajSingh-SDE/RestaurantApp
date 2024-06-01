import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../ContextApi/CartContextProvider.jsx";
import { useUser } from "../../ContextApi/UserContextProvider.jsx";
import Featured from "../Featured/Featured.jsx";
import Home from "../HomePage/Home.jsx";
import empty from "../HomePage/Assets/empty.png";

const Cart = () => {
  const { getUser, api, user } = useUser();
  console.log("api--- need ", api);

  // Add checks to ensure user and user.data are defined
  const userTable = user?.data?.usertable;

  const { cartItems, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showLoading, setShowLoading] = useState(false); // State to control loading screen visibility
  const [successMessage, setSuccessMessage] = useState(""); // State to display success message
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  const url = "https://restaurantbackend-i06a.onrender.com";

  const totalAmount = cartItems
    .reduce((total, item) => total + item.price.discount, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    const localStorageUser = localStorage.getItem("user");

    if (!user && !localStorageUser) {
      alert("Please log in or scan the scanner on the table.");
      return;
    }
    if (!name || !phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    setError("");
    setShowLoading(true); // Show loading screen

    try {
      const orderData = {
        userTable, // Use userTable
        name,
        phone,
        totalAmount,
        cartItems: cartItems.map((item) => item._id),
      };

      const {
        data: { key },
      } = await axios.get(`${api}/getkey`);
      const response = await axios.post(`${api}/orders/create`, orderData);

      const options = {
        key,
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        name: "ShivWorks.tech",
        description: "Payment Gateway",
        image:
          "https://shivwebio.netlify.app/static/media/mine2.8a86bbfd426b352aba39.png",
        order_id: response.data.id,
        prefill: {
          name: name,
          email: user?.data?.email, // Use optional chaining for email
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#FFA500", // Green theme
        },
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post(
              `${api}/payment/verify`,
              response
            );
            if (verificationResponse.data.success) {
              setSuccessMessage("Payment successful");
            } else {
              setErrorMessage("Payment verification failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            setErrorMessage("Error verifying payment");
          } finally {
            setShowLoading(false); // Hide loading screen after payment verification
          }
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
      });

      razor.open();
    } catch (error) {
      console.error(
        "Error processing order:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Oops! Something went wrong. Error in opening checkout");
      setShowLoading(false);
    }
  };

  // Close success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <section className=" md:py-16">
      <Home />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl mt-10 font-semibold text-gray-900 dark:text-black sm:text-2xl">
          Shopping Cart
        </h2>

        {showLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center text-white text-lg">
            Processing payment...
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-lg py-4 text-center">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white text-lg py-3 text-center">
            {errorMessage}
          </div>
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <img className=" scale-105" src={empty} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-orange-500 text-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                    >
                      <div className="relative w-1/4">
                        <img
                          className="w-full h-28 object-cover"
                          src={item.imageUrl}
                          alt="Product Image"
                        />
                      </div>
                      <div className="w-3/4 p-4 relative">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm overflow-hidden whitespace-nowrap">
                            {item.description}
                          </p>
                        </div>
                        <div className="absolute -top-1 right-0">
                          <button
                            onClick={() => removeFromCart(index)}
                            className="bg-white text-red-600 dark:text-red-400 p-2 rounded-bl-3xl hover:bg-red-100 dark:hover:bg-red-600 focus:outline-none"
                          >
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-semibold">
                            ₹{item.price.discount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="rounded-lg border border-gray-200 bg-[#000000] bg-opacity-90  p-4 shadow-md dark:border-gray-700 sm:p-6">
              <p className="text-xl font-semibold text-white dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-medium text-white dark:text-white">
                      Price:
                    </dt>
                    <dd className="text-base font-medium text-white dark:text-white">
                      ₹{" "}
                      {cartItems
                        .reduce((total, item) => total + item.price.discount, 0)
                        .toFixed(2)}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-medium text-white dark:text-white">
                      tax:
                    </dt>
                    <dd className="text-base font-medium text-white dark:text-white">
                      00.00
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-lg font-medium text-white dark:text-white">
                    Total Amount
                  </dt>
                  <dd className="text-lg font-medium text-white dark:text-white">
                    ₹{" "}
                    {cartItems
                      .reduce((total, item) => total + item.price.discount, 0)
                      .toFixed(2)}
                  </dd>
                </dl>

                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white dark:text-white"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white dark:text-white"
                  >
                    Phone:
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-[#FFA500] text-white rounded-lg py-2 px-4 font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Checkout
                </button>
              </div>
            </div>

            <div className="">
              <Featured />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
