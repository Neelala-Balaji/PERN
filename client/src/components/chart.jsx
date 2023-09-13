import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import BarChart from "../charts/barchart";
import jsonData from "../static/chart-data.json";

const D3Charts = () => {
  //  static data for chart
  const [data, ,] = useState([
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
    { label: "D", value: 30 },
    { label: "E", value: 25 },
  ]);

  const [apiData, setApiData] = useState([]);

  //  code for fetching json data from local and parse the data
  const parsedData = jsonData.records.map((dt) => {
    return { ...dt, label: dt.year, value: dt.sales };
  });

  //  code for fetching json data from API
  useEffect(() => {
    // Fetch data from the Node.js backend
    axiosInstance
      .get("/chartdata")
      .then((response) => {
        // parse the data from API
        const apiParseData = response?.data?.map((dt) => {
          return { ...dt, label: dt.district_name, value: dt.district_code };
        });
        setApiData(apiParseData || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="h-80">
      <h1>Bar Chart with basic Data</h1>
      <BarChart data={data} />
      <h1>Bar Chart with Year Data</h1>
      <BarChart data={parsedData} />
      <h1>
        Bar Chart with API data fetching from Postgres Database using NODE js
      </h1>
      <BarChart data={apiData} />
    </div>
  );
};

export default D3Charts;
