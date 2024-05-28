import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[black] mt-10 rounded-t-2xl shadow-2xl">
      <div className="container mx-auto px-4 py-6 lg:py-8 flex flex-col items-start justify-start">
        <div className="mb-6 md:mb-0 mr-5 ml-5">
          <div className="flex items-center">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
              Elegance
            </h1>
          </div>
        </div>
        <br />
        <div className="md:flex md:justify-between flex-row w-full">
          <div className="grid mt-5 grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul class="text-gray-700 dark:text-gray-700 font-medium">
                <li class="mb-4">
                  <Link to="/product/latest-products" class="hover:underline">
                    Latest Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/accessories/Watch?category=Watch"
                    class="hover:underline"
                  >
                    New Watches
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul class="text-gray-700 dark:text-gray-700 font-medium">
                <li class="mb-4">
                  <a
                    href="https://github.com/shivrajsingh-sde"
                    class="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/shivrajsingh-sde"
                    class="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul class="text-gray-700 dark:text-gray-700 font-medium">
                <li class="mb-4">
                  <a href="/privaciy-policy" class="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/privaciy-policy" class="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-white sm:text-center dark:text-white">
              © 2024{" "}
              <a
                href="https://shivwebio.netlify.app/"
                target="_blank"
                className="hover:underline"
              >
                SHIVWEBIO™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
