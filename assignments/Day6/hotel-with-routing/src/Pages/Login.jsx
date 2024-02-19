import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const handleLogin = () => {
    // Make GET request to /users and get all users data
    // Verify user and obtain token
    const token = 'your obtained token'; // Placeholder

    loginUser(token);
  };

  return (
    <div>
      <form data-cy="login-form" onSubmit={handleLogin}>
        <input data-cy="login-email" type="email" placeholder="Enter Email" />
        <input data-cy="login-password" type="password" placeholder="Enter Password" />
        <input type="submit" />
      </form>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Login;
