import React, { useState } from "react";
import axiosInstance from "../axios";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post(`/newsletter`, { email })
      .then((response) => {
        console.log(response.data);
        // Handle successful response (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error (e.g., show an error message)
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>News Letter</h2>
      <div className="formcss">
        <input
          type="text"
          name="email"
          placeholder="Enter email to subscibe News letter"
          onChange={handleChange}
          value={email}
        />
      </div>
      <div>
        <button type="submit" className="submit">
          Subscribe
        </button>
      </div>
    </form>
  );
}
