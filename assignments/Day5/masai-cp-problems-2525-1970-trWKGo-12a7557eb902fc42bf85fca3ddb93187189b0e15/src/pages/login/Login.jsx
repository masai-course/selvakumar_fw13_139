// src/pages/Login.jsx

import React, { useContext } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContextProvider';
import { login } from './api';

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const { token } = await login();
      // Handle successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Box>
      <Input type="email" name="email" placeholder="Email" />
      <Input type="password" name="password" placeholder="Password" />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
