import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  const updateToken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", JSON.stringify(token));
  }, [currentUser, token]);

  return (
    <AuthContext.Provider
      value={{ currentUser, updateUser, token, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
