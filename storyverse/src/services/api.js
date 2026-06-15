import axios from "axios";

const api = axios.create({
  // Switched dynamically from localhost during production staging
  baseURL: "http://localhost:3000" 
});

export default api;