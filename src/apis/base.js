import axios from "axios";
import { DEFAULT_API_LOCALHOST } from "../urls";
import Cookies from "js-cookie";

export const postingActionTypes = {
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
  POST_FAILED: "POST_FAILED",
};

export const fetchingActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILED: "FETCH_FAILED",
  AUTH_FAILED: "AUTH_FAILED",
};

export const patchActionTypes = {
  PATCHING: "PATCHING",
  PATCH_SUCCESS: "PATCH_SUCCESS",
  PATCH_FAILED: "PATCH_FAILED",
  AUTH_FAILED: "AUTH_FAILED",
};

export const baseAxios = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});

export const baseAxiosWithAuthHeaders = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});

baseAxiosWithAuthHeaders.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (accessToken && client && uid) {
      config.headers["access-token"] = accessToken;
      config.headers.client = client;
      config.headers.uid = uid;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxiosWithAuthHeaders.interceptors.response.use(
  (res) => {
    return res;
  },
  (e) => {
    if (e.response.status === 401) {
      return Promise.reject({
        isLogin: false,
      });
    } else {
      return Promise.reject(e);
    }
  }
);

export const fetchCurrentUser = async () => {
  return baseAxiosWithAuthHeaders.get("/auth/current_user");
};
