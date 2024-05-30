import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesPage from "./RoutesPage/RoutesPage";
import Navbar from "./Pages/HomePage/Navbar";
import Footer from "./Pages/HomePage/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesPage />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
