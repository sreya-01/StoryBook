import axios from "axios";

const api = axios.create({
  // Switched dynamically from localhost during production staging
  baseURL: "https://storybook-dy6q.onrender.com/" 
});

export default api;