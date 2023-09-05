import React, { useState } from "react";
import axiosInstance from "../axios";

const Fileupload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel
        "text/csv", // CSV
        "application/msword", // Word
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word (docx)
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp", // Images
        "application/pdf", // PDF
      ];
      const maxSize = 1 * 1024 * 1024; // 1MB

      if (
        allowedTypes.includes(selectedFile.type) &&
        selectedFile.size <= maxSize
      ) {
        setFile(selectedFile);
      } else {
        alert("Invalid file type or size.");
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post("/fileUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="formcss">
      <h2>File upload</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <button className="submit" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Fileupload;
