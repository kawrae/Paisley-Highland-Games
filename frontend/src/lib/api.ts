// src/lib/api.ts
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:4000/api";

export const api = axios.create({ baseURL });

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("phg_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: auto-logout on 401/403
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      localStorage.removeItem("phg_token");
      localStorage.removeItem("phg_user");
      // If you want an automatic redirect, uncomment:
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
