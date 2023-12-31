import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { GlobalContext } from "../context";
import NewsLetter from "../components/newsletter";
import Fileupload from "../components/fileupload";
import CsvUpload from "../components/csvupload ";
import CustomTable from "../components/table";
import CsvDownload from "../components/csvdownload";
import D3Charts from "../components/chart";
import Translation from "../pages/translator";
import Users from "./users";
import { Condition } from "../components/Condition";
import AccessDenied from "../components/accessdenied";
import axiosInstance from "../axios";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isDash, setIsDash] = useState(globalState.isAuth);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Use the instance for making authenticated requests
      axiosInstance
        .get(`/protected`)
        .then((response) => {
          setGlobalState((prevData) => {
            return { ...prevData, ...response.data.user, isAuth: true };
          });
        })
        .catch((error) => {
          // Handle authentication errors or other errors
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsDash(globalState.isAuth);
  }, [globalState.isAuth]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Condition show={isDash}>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} height={"80vh"}>
              <Grid item xs={12}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="News Letter" {...a11yProps(0)} />
                    <Tab label="File Upload" {...a11yProps(1)} />
                    <Tab label="Export CSV" {...a11yProps(2)} />
                    <Tab label="Download CSV" {...a11yProps(3)} />
                    <Tab label="Pagination with Table" {...a11yProps(4)} />
                    <Tab label="User Management" {...a11yProps(5)} />
                    <Tab label="D3 Charts" {...a11yProps(6)} />
                    <Tab label="Translation" {...a11yProps(7)} />
                  </Tabs>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <CustomTabPanel value={value} index={0}>
                  <NewsLetter />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Fileupload />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <CsvUpload />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <CsvDownload />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                  <CustomTable />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                  <Users />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={6}>
                  <D3Charts />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={7}>
                  <Translation />
                </CustomTabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Condition>
      <Condition show={!isDash}>
        <AccessDenied />
      </Condition>
    </>
  );
};

export default Dashboard;
