// Components/Navbar.tsx
import React from 'react';

interface NavbarProps {
    pageName: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  return (
    <div>
      <span style={{margin:'50px'}}>Masai Post</span>
      <span style={{margin:'50px'}}>
      <a className="home-link" href="/">
        Home
      </a>
      </span>
      <span style={{margin:'50px'}}>
      <a className="all-problems" href="/add-post">
        Add New Post
      </a>
      </span>
      <h3 data-testid="page-name">{pageName}</h3>
    </div>
  );
};

export {Navbar};
