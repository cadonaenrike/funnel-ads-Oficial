import axios from "axios";

const z_api = axios.create({
  baseURL:
    "https://api.z-api.io/instances/3CE597B19E8DE097F644EEE17BD0D626/token/965C62C61831039C966CD01A",
  headers: {
    "content-type": "application/json",
    "Client-Token": "Fd768949cae3942a09a90c4b26bdf0ef8S",
  },
});

export default z_api;
