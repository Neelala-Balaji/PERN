import React from "react";
import Login from "../components/login";
import Registration from "../pages/registration";

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-identity">
        <a href="#">
          <img src="http://via.placeholder.com/400" alt="Site Name" />
        </a>
        <h1>
          <a href="#">PERN POC</a>
        </h1>
      </div>
      <nav className="site-navigation">
        <ul className="nav">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>

          <li>
            <Registration />
          </li>
          <li>
            <Login />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
