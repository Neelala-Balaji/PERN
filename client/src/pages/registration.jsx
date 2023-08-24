import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";

const Registration = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAdd, setIsAdd] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const addOrUpdate = isAdd ? "updateusers" : "insertusers";
    // Send the insert query to the backend
    axios
      .post(`http://localhost:5000/api/${addOrUpdate}`, formData)
      .then((response) => {
        console.log(response.data);
        loadregisterUsers();
        resetFormData();
        // Handle successful response (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error (e.g., show an error message)
      });
  };

  useEffect(() => {
    loadregisterUsers();
  }, []);

  const loadregisterUsers = () => {
    axios
      .get("http://localhost:5000/api/getusers")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const editRow = (item) => {
    setFormData((prevData) => ({ ...prevData, ...item }));
    setIsAdd(true);
  };

  const deleteRow = (event, formData) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/deleteusers/${formData.id}`)
      .then((response) => {
        console.log(response.data);
        loadregisterUsers();
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

          {!isAdd && (
            <button className="submit" type="submit">
              Sign Up
            </button>
          )}
          {isAdd && (
            <button className="submit" type="submit">
              Update
            </button>
          )}
        </form>
      </Grid>
      <Grid item xs={12}>
        <h3>Registered users</h3>
        <ul className="reglist">
          {data.map((item) => (
            <li key={item.id} className="list">
              {item.username} - {item.email}
              <span className="btn" onClick={() => editRow(item)}>
                Edit
              </span>
              <span className="padding">|</span>
              <span className="delete" onClick={(e) => deleteRow(e, item)}>
                Delete
              </span>
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Registration;
