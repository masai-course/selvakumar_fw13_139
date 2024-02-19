import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div data-cy="welcome-text">
      Welcome to the Home page, click here to 
      <Link to="/login">login</Link>.
    </div>
  );
};

export default Home;
