import axios from "axios";

// Set up a default Axios instance with the token in the headers
const axiosInstance = axios.create({
  baseURL: "http://your-backend-api-url.com",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export default axiosInstance;
