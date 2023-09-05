import React, { useState } from "react";
import axiosInstance from "../axios";

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
      await axiosInstance.post("/csvupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded and data inserted.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
    </div>
  );
};

export default CsvUpload;
