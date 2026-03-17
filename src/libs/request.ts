import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:8101",
  timeout: 10000,
  withCredentials: true,
});
myAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
myAxios.interceptors.response.use(
  function (response) {
    const { data } = response;
    if (data.code === 40100) {
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    } else if (data.code !== 0) {
      throw new Error(data.message ?? "服务器错误");
    }
    return data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default myAxios;
