import React, { createContext, useReducer } from 'react';
import authReducer from './authReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const initialState = {
    authDetails: {
      isAuth: false,
      token: ''
    },
    login: token => dispatch({ type: 'LOGIN', payload: token }),
    logout: () => dispatch({ type: 'LOGOUT' })
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
