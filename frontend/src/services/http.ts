import axios from "axios";


const BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;


const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      401 === error.response.status &&
      window.location.href.indexOf("/signin") === -1
    ) {
      localStorage.removeItem("user");
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient
