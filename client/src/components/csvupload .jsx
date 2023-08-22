import React, { useState } from "react";
import axios from "axios";

const CsvUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", selectedFile);

    try {
      await axios.post("http://localhost:5000/api/csvupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded and data inserted.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const csvDownload = async () => {
    axios
      .get(`http://localhost:5000/api/csvdownload`)
      .then((response) => {
        console.log(response.data);
        if (response.data?.length) handleDownload(response.data);
        // Handle successful response (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error (e.g., show an error message)
      });
  };

  const convertJSONToCSV = (jsonData) => {
    const csvRows = [];

    // Extract headers (keys)
    const headers = Object.keys(jsonData[0]);
    csvRows.push(headers.join(","));

    // Extract values and create rows
    for (const row of jsonData) {
      const values = headers.map((header) => row[header]);
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const handleDownload = (jsonData) => {
    const csvContent = convertJSONToCSV(jsonData);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="formcss">
      <h2>CSV upload into Databse</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <button className="submit" onClick={handleUpload}>
          Insert
        </button>
      </div>

      <div>
        <h2>Download CSV</h2>

        <button className="submit" onClick={csvDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default CsvUpload;
