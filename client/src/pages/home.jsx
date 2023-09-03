import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <div class="container">
          <header>
            <h1>Welcome to Our Website</h1>
            <p>Your source for all things amazing!</p>
          </header>
          <section class="jumbotron">
            <h2>Discover Something Great</h2>
            <p>Explore our collection of incredible content and features.</p>
            <Link to="/dashboard" className="link">
              View Dashboard
            </Link>
          </section>
          <section class="jumbotron">
            <h2>About Us</h2>
            <p>Learn more about our company and mission.</p>
            <Link to="/about" className="link">
              About Us
            </Link>
          </section>
          <section class="jumbotron">
            <h2>Contact Us</h2>
            <p>Have questions? We're here to help!</p>
            <Link to="/contact" className="link">
              Contact Us
            </Link>
          </section>
        </div>
      </Box>
    </>
  );
};

export default Home;
