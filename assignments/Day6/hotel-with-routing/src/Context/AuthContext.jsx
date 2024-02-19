import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginUser = () => {
    setIsAuth(true);
  };

  const logoutUser = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
