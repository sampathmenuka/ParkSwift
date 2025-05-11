import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const AuthContext = createContext();

const AuthContextProvider = (props) => {



  
  const value = {

  };




  return (
    <AuthContext.Provider value ={ value }>
      {props.children}
    </AuthContext.Provider>
  )
}


export default AuthContextProvider;