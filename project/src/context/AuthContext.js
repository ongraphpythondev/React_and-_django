import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );
  let [authToken, setToken] = useState(
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  let token = async (token) => {
    setToken(token);
    setUser(jwt_decode(token.access));
    console.log(token);
    localStorage.setItem("authToken", JSON.stringify(token));
  };

  const navigate = useNavigate();
  let logout = async (token) => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  let update_token = () => {
    axios
      .post(`http://localhost:8000/api/token/refresh/`, {
        refresh: authToken["refresh"],
      })
      .then((res) => {
        setToken(res.data);
        localStorage.setItem("authToken", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let interval = setInterval(() => {
      if (authToken) {
        update_token();
      }
    }, 9000);
    return () => clearInterval(interval)
  });
  
  let contextData = {
    user: user,
    token: token,
    logout: logout,
    authToken: authToken
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
