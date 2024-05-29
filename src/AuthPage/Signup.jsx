// Import necessary dependencies
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Define the Register component
const Signup = () => {
  const useAuth = 0;

  // Initialize state for user data
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Get the navigation function from useNavigate
  const navigate = useNavigate();

  // Get the storeTokenInLs function from useAuth
  const { storeTokenInLs } = useAuth();

  // Define the function to handle input changes
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // Update user state based on input changes
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Define the registration submit function
  const registrationSubmit = async (e) => {
    try {
      e.preventDefault();

      // Make a POST request to the registration endpoint
      const response = await axios.post(
        "http://localhost:3000/api/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Get the response data
      const res_data = response.data;
      console.log("the responae", response);
      // Check if the status code is 200 (OK)
      if (response.status === 200) {
        // Store token in local storage
        storeTokenInLs(res_data.token);

        // Reset user state
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("login successful");
        navigate("/");
      } else {
        toast.error(
          `
        ${res_data.message ? res_data.extraDetails : response.data}`,
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
      // Log registration error
      // alert("Registration Error");

      console.log("Registration Error hai je", error.response);

      console.log("Registration error:", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration mt-20">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hide the image in mobile view */}
              <div className="registration-image hidden md:block ">
                <img
                  src="./images/register.png"
                  alt="registration img"
                  className="w-full h-full"
                />
              </div>
              <div className="registration-form p-4">
                <form onSubmit={registrationSubmit}>
                  {/* Adjust the registration title in mobile view */}
                  <h1 className="text-2xl md:text-3xl font-bold mb-3">
                    Registration Form
                  </h1>
                  <div className="mb-4">
                    <label htmlFor="username" className="block mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1">
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Phone Number"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                  >
                    Register now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Signup;
