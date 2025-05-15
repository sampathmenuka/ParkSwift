import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


axios.defaults.withCredentials = true;

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)


  const getAuthState = async () => {

    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');

      if (data.success) {
        setIsAuthenticated(true);

        if (data.user) {
          setUser(data.user);
        }
      } else {
          setIsAuthenticated(false);
          setUser(null);
          toast.error(data.message)
      }

    } catch (error) {
        toast.error("Authentication check failed: " + error.message);
        setIsAuthenticated(false);
        setUser(null);
    } finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  },[]);


  const value = {
    user, setUser,
    isAuthenticated,
    getAuthState,
    backendUrl,
    setIsAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
