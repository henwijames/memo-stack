import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI || "http://localhost:5001/api",
  withCredentials: true, // to send cookies with requests
});

export default api;
