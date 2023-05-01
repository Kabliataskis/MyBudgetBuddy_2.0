import {useState, useEffect, createContext, useContext} from 'react'
import { Navigate } from 'react-router-dom';
const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    let token = localStorage.getItem("token") || null;
    useEffect(() => {
        if (token) {
          let token_info = parseJwt(token);
          if (token_info && !isJwtExpired(token)) {
            setUser(token_info);
          } else {
            logout();
          }
        }
      }, []);
        
    const login = (token) => {
        console.log(parseJwt(token));
        localStorage.setItem("token", token);
        let token_info = parseJwt(token);
        setUser(token_info);
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



function isValidBase64(str) {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

// decode the logged in user
function parseJwt(token) {
    if (!token || token.split('.').length !== 3) {
      return null;
    }
    const base64Url = token.split(".")[1];
    if (!isValidBase64(base64Url)) {
      return null;
    }
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  

const isJwtExpired = (token) => {
    if (typeof(token) !== 'string' || !token) throw new Error('Invalid token provided');
    let isJwtExpired = false;
    const jwtPayload = parseJwt(token);
    if (!jwtPayload || !jwtPayload.exp) {
        return false;
    }
    const { exp } = jwtPayload;
    const currentTime = new Date().getTime() / 1000;
  
    if (currentTime > exp) isJwtExpired = true;
  
    return isJwtExpired;
}