import React, { useContext } from "react";
import ProductContext from "../../ContextApi/ProductContext";
import Cards from "./Cards";

export const Products = () => {
  const { products, error } = useContext(ProductContext);
  console.log("products---", products);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {products.map((item, index) => (
          <Cards
            key={index}
            name={item.name}
            describe={item.describe}
            provider={item.provider}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </>
  );
};
