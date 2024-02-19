import React from 'react';
import AllRoutes from "./Routes/AllRoutes";
import AuthContextProvider from './Context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <AllRoutes />
    </AuthContextProvider>
  );
};

export default App;
