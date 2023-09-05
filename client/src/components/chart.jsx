import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import * as d3 from "d3";

const D3Charts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the Node.js backend
    axiosInstance
      .get("/chartdata")
      .then((response) => {
        setData(response.data);
        drawChart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to create a D3.js bar chart
  function drawChart(data) {
    // D3 code to create the chart
    // You can customize this part to create your desired chart
  }

  return (
    <div className="h-80">
      <h1>D3.js Bar Chart</h1>
      <div id="chart-container"></div>
    </div>
  );
};

export default D3Charts;
