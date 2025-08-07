import axios from 'axios';

export const addExpense = (data, token) => {
  return axios.post('http://localhost:5000/api/expenses/add', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getExpenses = (token) => {
  return axios.get('http://localhost:5000/api/expenses/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteExpense = (id, token) => {
  return axios.delete(`http://localhost:5000/api/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatedExpense = (id, token) => {
  return axios.delete(`http://localhost:5000/api/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
