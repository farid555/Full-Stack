import axios from "axios";

const api = axios.create({
  baseURL: "https://lms-fin.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
