import React from "react";
interface NavbarProps {
  pageName: string;
}
export const Navbar : React.FC<NavbarProps> = ({ pageName }) => {
  return (
    <div>
      <span style={{margin:'50px'}}>Quiz Bank</span>
      <span style={{margin:'50px'}}>
      <a className="home-link" href="/">
        Home
      </a>
      </span>
      <span style={{margin:'50px'}}>
      <a className="all-problems" href="/all-problems">
        All Problems
      </a>
      </span>
      <h3 data-testid="page-name">{pageName}</h3>
    </div>

    
  );
};
