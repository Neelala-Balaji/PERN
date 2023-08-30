import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Header from "../shared/header";
import Footer from "../shared/footer";
import NewsLetter from "../components/newsletter";
import Fileupload from "../components/fileupload";
import CsvUpload from "../components/csvupload ";
import CustomTable from "../components/table";
import CsvDownload from "../components/csvdownload";
import Users from "./users";

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

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>

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
                  <Tab label="CRUD Operations" {...a11yProps(5)} />
                  <Tab label="Visualizations" {...a11yProps(6)} />
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
                Visualisations
              </CustomTabPanel>
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
