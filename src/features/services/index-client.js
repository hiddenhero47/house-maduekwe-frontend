import axios from "axios";
import { store } from "../../store/index";
import { toast } from "react-toastify";

// Get user details
const userDetails = () => {
  let authState = store.getState().auth;
  return authState || {};
};

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:5001/";
const CRUD_TYPE = import.meta.env.REACT_APP_AXIOS_CRUD_TYPE?.trim()?.split(" ") || [
  "GET",
  "POST",
  "PUT",
  "DELETE",
];

const successResponseHandler = (res) => {
  console.log("Response:", res);
  return res;
};

const errorResponseHandler = (error) => {
  const message =
  error.response?.data?.message ||
  error.response?.data ||
  error.message ||
  "An unknown error occurred";

  if (error.response && error.response.status === 401) {
    console.error("Unauthorized, logging out...");
  }

  toast.error(message.toString());
  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {},
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (req) {
    const { token } = userDetails();

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    // Reattach the base url
    if (!req.url.startsWith("http")) {
      req.url = BASE_URL + req.url.replace(/^\/+/, "");
    }

    return req;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return successResponseHandler(res);
  },
  (error) => {
    return errorResponseHandler(error);
  }
);

export const axiosCall = async (arg) => {
  const { url, method, data, params } = arg;

  if (!url || !method || !CRUD_TYPE.includes(method)) {
    throw new Error("axiosCall error");
  }

  try {
    const response = await axiosInstance({
      method,
      url,
      params,
      data,
    });

    return response.data; // Return only the data part of the response
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "An unknown error occurred";
    console.error("Axios Error:", message);
    throw message;
  }
};

export default axiosInstance;
