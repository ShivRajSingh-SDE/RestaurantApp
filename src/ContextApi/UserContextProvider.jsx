import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext();

const api = "https://restaurantbackend-i06a.onrender.com/api";

const initialState = {
  isUserLoading: false,
  isUserError: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_LOADING":
      return { ...state, isUserLoading: true, isUserError: false };
    case "SET_USER_DATA":
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      return { ...state, isUserLoading: false, user: action.payload.data };
    case "SET_USER_ERROR":
      return { ...state, isUserLoading: false, isUserError: true };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUser = async (url) => {
    dispatch({ type: "SET_USER_LOADING" });

    try {
      const response = await axios.get(url);
      const user = await response.data;

      dispatch({
        type: "SET_USER_DATA",
        payload: { data: user },
      });
    } catch (error) {
      // console.log("Error fetching user data:", error);
      dispatch({ type: "SET_USER_ERROR" });
    }
  };

  return (
    <UserContext.Provider value={{ ...state, getUser, api }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const userContextValue = useContext(UserContext);
  if (!userContextValue) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return userContextValue;
};

export default UserContextProvider;
