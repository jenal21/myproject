import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/expenses`;

export const addExpense = (data, token) => {
  return axios.post(`${API}/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getExpenses = (token) => {
  return axios.get(`${API}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteExpense = (id, token) => {
  return axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateExpense = (id, data, token) => {
  return axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
