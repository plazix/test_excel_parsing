import axios, { AxiosRequestConfig } from "axios";
import { authHeader } from "./header"

const API_URL = "http://localhost:8000/api/processing";


class ProcessingService {
  list() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new ProcessingService();
