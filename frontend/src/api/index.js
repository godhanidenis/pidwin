import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const userProfile = (userId) => API.get("/api/user/userProfile");
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);
export const coinToss = (formData) =>
  API.post("/api/pidwin/coinToss", formData);
export const lastTosses = () => API.get("/api/pidwin/lastTosses");
