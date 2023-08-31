import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/login";
import Registration from "../pages/registration";

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-identity">
        <a href="/">
          <img src="http://via.placeholder.com/400" alt="Site Name" />
        </a>
        <h1>
          <a href="/">PERN POC</a>
        </h1>
      </div>

      <nav className="site-navigation">
        <ul className="nav">
          <li>
            <Link to="/about" style={{ padding: 5 }}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ padding: 5 }}>
              Contact
            </Link>
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
