import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesPage from "./RoutesPage/RoutesPage";
import Navbar from "./Pages/HomePage/Navbar";
import Footer from "./Pages/HomePage/Footer";

import ProductContextProvider from "./ContextApi/ProductContextProvider";

function App() {
  return (
    <ProductContextProvider>
      <BrowserRouter>
        <Navbar />
        <RoutesPage />
        <Footer />
      </BrowserRouter>
    </ProductContextProvider>
  );
}

export default App;
