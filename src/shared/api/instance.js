import axios from "axios";

const instance = axios.create({
  timeout: 3000,
<<<<<<< HEAD
  // baseURL: "https://www.zzzback.shop",
  baseURL: "http://f"
=======
  baseURL: "http://www.zzzback.shop",
>>>>>>> 62fe15b848907859712a3f039833ca682c31efc3
});

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
    console.log(error);
    return Promise.reject(error);
  }
);

// response
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
