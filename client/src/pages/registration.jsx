import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import BasicModal from "../shared/modal";
import Button from "@mui/material/Button";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
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
      .post(`http://localhost:5000/api/insertusers`, formData)
      .then((response) => {
        console.log(response.data);
        resetFormData();
        // Handle successful response (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error (e.g., show an error message)
      });
  };

  const resetFormData = () => {
    setFormData((prevData) => ({
      username: "",
      email: "",
      password: "",
    }));
  };

  return (
    <>
      <Button onClick={() => setShowLogin(true)}>Registration</Button>
      <BasicModal visible={showLogin} onClose={() => setShowLogin(false)}>
        <Grid
          container
          spacing={3}
          justifyContent={"center"}
          alignItems={"center"}
          columnGap={3}
          direction={"column"}
        >
          <Grid itexm xs={12}>
            <h3>User Registration</h3>
            <form onSubmit={handleSubmit}>
              <div className="formcss">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>

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
                Sign Up
              </button>
            </form>
          </Grid>
        </Grid>
      </BasicModal>
    </>
  );
};

export default Registration;
