import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/login";
import Registration from "../pages/registration";
import { GlobalContext } from "../context";
import { Condition } from "../components/Condition";
import Profile from "../pages/profile";

const Header = () => {
  const { globalState } = useContext(GlobalContext);
  const [isDash, setIsDash] = useState(globalState.isAuth);

  useEffect(() => {
    setIsDash(globalState.isAuth);
  }, [globalState.isAuth]);

  return (
    <header className="site-header">
      <div className="site-identity">
        <a href="/">
          <img src="http://via.placeholder.com/400" alt="Site Name" />
        </a>
        <h1>
          <a href="/" className="link">
            PERN POC
          </a>
        </h1>
      </div>

      <nav className="site-navigation">
        <ul className="nav">
          <li>
            <Link to="/about" style={{ padding: 5 }} className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ padding: 5 }} className="link">
              Contact
            </Link>
          </li>
          <Condition show={!isDash}>
            <li>
              <Registration />
            </li>
          </Condition>

          <li>
            <Condition show={!isDash}>
              <li>
                <Login />
              </li>
            </Condition>
            <Condition show={isDash}>
              <Profile />
            </Condition>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
