import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ProductContextProvider from "./ContextApi/ProductContextProvider.jsx";
import UserContextProvider from "./ContextApi/UserContextProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ProductContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ProductContextProvider>
  </>
);
