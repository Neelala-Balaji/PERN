import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Header from "../shared/header";
import Footer from "../shared/footer";
import NewsLetter from "../components/newsletter";
import Fileupload from "../components/fileupload";
import CsvUpload from "../components/csvupload ";
import CustomTable from "../components/table";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Grid>

          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
          <Grid className="display" item xs={6}>
            <NewsLetter />
          </Grid>

          <Grid className="display" item xs={6}>
            <Fileupload />
          </Grid>

          <Grid className="display" item xs={6}>
            <h2>CRUD Example - 1</h2>
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
            <br />
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
          <Grid className="display" item xs={6}>
            <CsvUpload />
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
            <Grid item xs={9}>
              <h2>Table with pagination</h2>
              <CustomTable />
            </Grid>
          </Grid>
          <Grid className="display" item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
