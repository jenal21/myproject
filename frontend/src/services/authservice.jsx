import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/users`;

export const registerUser = async (data) => {
  return await axios.post(`${API}/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API}/login`, data);
};
