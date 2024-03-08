import axios from "axios";

const api = axios.create({
  baseURL: "https://funnelads.vercel.app",
  // baseURL: "https://server-oqb147cum-softus.vercel.app", essse e o novo do time ja mas esta com erro de cors
  headers: {
    "content-type": "application/json",
    "api-key": process.env.NEXT_PUBLIC_APYKEY,
  },
});

export default api;
