import axios from "axios";

const instance = axios.create({
  timeout: 3000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

//-- request --
instance.interceptors.request.use(
  (config) => {
    const USER_TOKEN = `Bearer ${localStorage.getItem("token")}`;
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Authorization"] = USER_TOKEN ? USER_TOKEN : "";
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//-- response --
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
