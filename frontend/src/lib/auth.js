import api from "./axios";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (userData) => {
  try {
    const res = await api.post("/auth/login", userData);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
export const refreshToken = async () => {
  try {
    const res = await api.post("/auth/refresh");
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};
