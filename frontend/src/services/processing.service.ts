import { authHeader } from "./header"
import apiClient from "./http"

const API_URL = "/api/processing";


class ProcessingService {
  list() {
    return apiClient.get(API_URL, { headers: authHeader() });
  }

  upload(f: File) {
    const formData = new FormData();
    formData.append("file", f, f.name);

    return apiClient.post(API_URL, formData, { headers: authHeader() });
  }
}

export default new ProcessingService();
