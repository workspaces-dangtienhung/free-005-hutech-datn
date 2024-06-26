import axios from "axios";

const intance = axios.create({
  baseURL: "http://103.166.182.195:8080",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

intance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

intance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default intance;
