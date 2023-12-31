import React, { useContext, useState } from "react";
import BasicModal from "../shared/modal";
import Button from "@mui/material/Button";
import { GlobalContext } from "../context";
import axiosInstance from "../axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showLogin, setShowLogin] = useState(false);
  const { setGlobalState } = useContext(GlobalContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/login", formData)
      .then((response) => {
        setGlobalState((prevData) => {
          return { ...prevData, ...response.data, isAuth: true };
        });
        resetFormData();
        setShowLogin(false);
        const token = response.data.token;
        sessionStorage.setItem("token", token);
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
      <Button onClick={() => setShowLogin(true)}>Sign In</Button>
      <BasicModal visible={showLogin} onClose={() => setShowLogin(false)}>
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
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
