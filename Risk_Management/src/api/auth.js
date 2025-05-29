// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-latv.vercel.app/", // Make sure this matches your backend
  withCredentials: true,
});

export const signup = async (userData) => {
  try {
    const response = await API.post("/signup", userData);
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || "Signup failed" };
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || "Login failed" };
  }
};

export const logout = async () => {
  try {
    await API.post("/logout");
    return { error: null };
  } catch (err) {
    return { error: err.response?.data?.message || "Logout failed" };
  }
};

export const checkAuth = async () => {
  try {
    const response = await API.get("/check-auth");
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data?.message || "Not authenticated" };
  }
};