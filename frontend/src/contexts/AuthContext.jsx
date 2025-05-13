import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null)


  // login function
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }

  // logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }

  // check if a user is stored in localstorage when app loads 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true)
    }
  }, []);

  
  const value = {
    user, setUser,
    isAuthenticated, setIsAuthenticated,
    login, logout,
  };




  return (
    <AuthContext.Provider value ={ value }>
      {props.children}
    </AuthContext.Provider>
  )
}


export default AuthContextProvider;