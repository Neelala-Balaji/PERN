import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicModal from "../shared/modal";
import Button from "@mui/material/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:5000/api/authenticate`, formData)
      .then((response) => {
        console.log(response.data);
        resetFormData();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error (e.g., show an error message)
      });
  };

  const resetFormData = () => {
    setFormData(() => ({
      email: "",
      password: "",
    }));
  };

  return (
    <div>
      <Button onClick={() => setShowLogin(true)}>Log In</Button>
      <BasicModal visible={showLogin} onClose={() => setShowLogin(false)}>
        <form onSubmit={handleSubmit}>
          <div className="formcss">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="formcss">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button className="submit" type="submit">
            Log In
          </button>
        </form>
      </BasicModal>
    </div>
  );
};

export default Login;
