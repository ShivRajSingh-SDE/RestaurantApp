import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../../ContextApi/CartContextProvider.jsx";
import { useUser } from "../../ContextApi/UserContextProvider.jsx";
import Featured from "../Featured/Featured.jsx";

const Cart = () => {
  const { getUser, api, user } = useUser();
  const usertabel = user.data.usertable;
  const { cartItems, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const url = "http://localhost:5454";
  console.log(user);
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price.discount, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    if (!name || !phone) {
      setError("Please enter your name and phone number.");
    } else {
      setError("");
      try {
        const orderData = {
          userTable: usertabel,
          name,
          phone,
          cartItems: cartItems.map((item) => item._id),
        };
        const {
          data: { key },
        } = await axios.get(`${api}/getkey`);

        const response = await axios.post(
          `${url}/api/orders/create`,
          orderData
        );

        const options = {
          key, // Enter the Key ID generated from the Dashboard
          amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Ecommerce by pritam",
          description: "ecommerce payment gateway",
          image: "https://example.com/your_logo",
          order_id: response.data._id, // Pass the `id` obtained in the response of Step 1
          callback_url: `${api}/payment/verify`,
          prefill: {
            name: name,
            email: user?.data.email,
            contact: phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#0000",
          },
        };
        console.log(options);

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Error processing order:", error.message);
      }
    }
  };

  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 shadow-lg overflow-hidden transform transition-all hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          className="w-full h-64 object-cover"
                          src={item.imageUrl}
                          alt="Product Image"
                        />
                        <button
                          onClick={() => removeFromCart(index)}
                          className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-600 focus:outline-none"
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
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 overflow-hidden">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              ${item.price.discount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="rounded-lg border border-gray-200 bg-[#000000] bg-opacity-90 backdrop-blur p-4 shadow-md dark:border-gray-700 sm:p-6">
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
                      ${" "}
                      {cartItems
                        .reduce((total, item) => total + item.price.discount, 0)
                        .toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between  gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-white dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-white dark:text-white">
                    $
                    {cartItems
                      .reduce((total, item) => total + item.price.discount, 0)
                      .toFixed(2)}
                  </dd>
                </dl>
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                onClick={handleCheckout}
                className="border-white border-2 p-2 mt-5 text-white flex justify-center items-center hover:bg-[#ffffff18] w-full transition-colors duration-300"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <a
                  href="/menu"
                  title=""
                  className="inline-flex items-center gap-2 text-sm text-white font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-[#00000059] p-4 shadow-sm dark:border-gray-700 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Do you have a voucher or gift card?
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Apply Code
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <br />
          <br />
          <br />
          <br />
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
      </div>
    </section>
  );
};

export default Cart;
