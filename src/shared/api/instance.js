import axios from "axios";

// const instance = axios.create({
//   timeout: 3000,
//   baseURL: "https://www.zzzback.shop",
// });
// //request
// instance.interceptors.request.use(
//   (config) => {
//     const USER_TOKEN = `Bearer ${localStorage.getItem("token")}`;
//     config.headers["Content-Type"] = "application/json; charset=utf-8";
//     config.headers["X-Requested-With"] = "XMLHttpRequest";
//     config.headers["Authorization"] = USER_TOKEN ? USER_TOKEN : "";
//     config.headers.Accept = "application/json";
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );
const USER_TOKEN = `Bearer ${localStorage.getItem("token")}`;
const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "https://www.zzzback.shop",
  headers: {
    "content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: USER_TOKEN ? USER_TOKEN : "",
    accept: "application/json",
  },
});

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
