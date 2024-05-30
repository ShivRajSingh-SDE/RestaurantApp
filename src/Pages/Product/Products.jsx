import React, { useContext, useState, useEffect, Fragment } from "react";
import { useAuth } from "../../ContextApi/ProductContextProvider";
import Cards from "./Cards";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";

const sortOptions = [
  { name: "Most Popular", value: "most-popular", current: true },
  { name: "Best Rating", value: "best-rating", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "price-low-high", current: false },
  { name: "Price: High to Low", value: "price-high-low", current: false },
];

const filterOptions = [
  { name: "All", value: "all", current: true },
  { name: "Vegetarian", value: "vegetarian", current: false },
  { name: "Non-Vegetarian", value: "non-vegetarian", current: false },
];

const foodOptions = [
  { name: "All", value: "all", current: true },
  { name: "Pizza", value: "pizza", current: false },
  { name: "Burger", value: "burger", current: false },
  { name: "Indian", value: "indian", current: false },
  { name: "French Fries", value: "french-fries", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Products = () => {
  const { products, isLoading } = useAuth();
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [filterOption, setFilterOption] = useState(filterOptions[0]);
  const [foodOption, setFoodOption] = useState(foodOptions[0]);

  useEffect(() => {
    setSortOption(sortOptions[0]);
    setFilterOption(filterOptions[0]);
    setFoodOption(foodOptions[0]);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleFoodChange = (option) => {
    setFoodOption(option);
  };

  const sortedAndFilteredProducts = [...products]
    .filter((product) => {
      // Filter by vegetarian and non-vegetarian options
      if (filterOption.value === "all") return true;
      if (filterOption.value === "vegetarian")
        return product.tags.includes("vegetarian");
      if (filterOption.value === "non-vegetarian")
        return !product.tags.includes("vegetarian");
      return true;
    })
    .filter((product) => {
      // Filter by specific food options
      if (foodOption.value === "all") return true;
      return product.tags.includes(foodOption.value);
    })
    .sort((a, b) => {
      switch (sortOption.value) {
        case "most-popular":
          return 0;
        case "best-rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "price-low-high":
          return a.price.discount - b.price.discount;
        case "price-high-low":
          return b.price.discount - a.price.discount;
        default:
          return 0;
      }
    });

  return (
    <div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="font text-4xl font-bold tracking-tight text-white">
            Menu
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-100 hover:text-gray-400">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => handleSortChange(option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left ml-4">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-100 hover:text-gray-400">
                  Filter
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {filterOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => handleFilterChange(option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left ml-4">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-100 hover:text-gray-400">
                  Food
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {foodOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => handleFoodChange(option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="flex flex-wrap justify-around items-center">
            {sortedAndFilteredProducts.map((item) => (
              <Cards
                key={item._id}
                id={item._id}
                rating={item.rating}
                name={item.name}
                describe={item.description}
                provider={item.provider}
                price={item.price.discount}
                image={item.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
