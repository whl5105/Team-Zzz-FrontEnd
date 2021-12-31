import axios from "axios";

// const USER_TOKEN = `Bearer ${getToken("authorization")}`;
const USER_TOKEN = localStorage.getItem("token");

const instance = axios.create({
  timeout: 3000,
  // baseURL: "",
  baseURL: "http://54.180.109.58:3000",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    authorization: USER_TOKEN,
    Accept: "application/json",
  },
});
//request
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
//response
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
