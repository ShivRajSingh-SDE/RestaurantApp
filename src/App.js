import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesPage from "./RoutesPage/RoutesPage";
import Navbar from "./Pages/HomePage/Navbar";
import Footer from "./Pages/HomePage/Footer";
import { CartProvider } from "./ContextApi/CartContextProvider";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <RoutesPage />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
