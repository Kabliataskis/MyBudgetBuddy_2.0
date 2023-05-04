import {useState, useEffect, createContext, useContext} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "../axios";
const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    let token = localStorage.getItem("token") || null;
    const getInfo = async () => {
      if(token){        
        try {
        const res = await axios.get("/auth/me");
        setUser(res.data.data);
      } catch (err) {
        console.log(err.response.data.mess);
        logout();
      }
    }
    }   
    useEffect(() =>  {
      getInfo();
      }, []);
        
    const login = (data) => {
        localStorage.setItem("token", data.token);
        setUser(data);
    }
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
      }    
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const RequireAuth = ({children}) => {
    const auth = useAuth();
    if(!auth.user){
        return <Navigate to='/auth' replace/>
    }
    return children;
}

export const AuthorizedRedirect = ({children}) => {
  const auth = useAuth();
  if(auth.user){
      return <Navigate to='/' replace/>
  }
  return children;
}

