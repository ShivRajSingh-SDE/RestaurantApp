import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { storeTokenInLs } = useAuth();
  const useAuth = 0;

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const response = await axios.post(
        "http://localhost:5454/api/login",
        user
      );
      console.log("Server response this:", response);

      if (response.status === 200) {
        const res_data = response;
        const data = res_data.data.token;
        console.log("Server give:", data);

        storeTokenInLs(res_data.data.token);

        // Perform any other actions needed on successful login
        setUser({ email: "", password: "" });
        toast.success("login successful");
        navigate("/");
      } else {
        toast.error(
          `
${response.data.extraDetails ? response.data.extraDetails : response.data}`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="registration-form mt-12">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Hide the image in mobile view */}
          <div className="login-image hidden md:block">
            <img
              src="./images/login.png"
              alt="login img"
              className="w-full h-full"
            />
          </div>
          <div className="login-area p-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Login Form</h1>
            <div className="form-element">
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">
                    email
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="email"
                    placeholder="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    name="password"
                    placeholder="Password"
                    required
                    value={user.password}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
