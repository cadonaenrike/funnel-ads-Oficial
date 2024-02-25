import axios from "axios";

const api = axios.create({
  // baseURL: "https://serve-qm5b.vercel.app",
  baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
    "api-key": process.env.NEXT_PUBLIC_APYKEY,
  },
});

export default api;
