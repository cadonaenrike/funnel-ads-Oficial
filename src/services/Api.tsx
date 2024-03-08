import axios from "axios";

const api = axios.create({
  baseURL: "https://funnelads.vercel.app/",
  // baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
    "api-key": process.env.NEXT_PUBLIC_APYKEY,
  },
});

export default api;
