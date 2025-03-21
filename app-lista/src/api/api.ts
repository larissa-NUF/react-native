import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-mong-db-yp8x.onrender.com",
  timeout: 60000,
});