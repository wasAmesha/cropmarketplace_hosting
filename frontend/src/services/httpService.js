import axios from "axios";

axios.defaults.baseURL = "https://crop-marketplace-frontend-4.onrender.com";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;
