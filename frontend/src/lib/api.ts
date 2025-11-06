import axios from "axios";

const envRoot = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const fallbackRoot = import.meta.env.DEV ? "http://localhost:4000" : "";

const root = envRoot || fallbackRoot;

const baseURL = root ? `${root}/api` : "/api";

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("phg_token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      localStorage.removeItem("phg_token");
      localStorage.removeItem("phg_user");
    }
    return Promise.reject(err);
  }
);
