import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);  
  const [userData, setUserData] = useState(null);

  // Function to check if the user is logged in by checking localStorage
  const getAuthState = async () => {
    const storedIsLoggedin = localStorage.getItem("isLoggedin") === "true";
    const storedUserData = localStorage.getItem("userData");

    if (storedIsLoggedin && storedUserData) {
      setIsLoggedin(true);
      setUserData(JSON.parse(storedUserData));  // Parse and set user data
    } else {
      try {
        const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
        if (data.success) {
          setIsLoggedin(true);
          getUserData(); // Fetch user data if authenticated
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Function to fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      if (data.success) {
        setUserData(data.userData);
        // Persist user data and auth state in localStorage
        localStorage.setItem("userData", JSON.stringify(data.userData));
        localStorage.setItem("isLoggedin", "true");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  // Run the check for the auth state on initial load
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
