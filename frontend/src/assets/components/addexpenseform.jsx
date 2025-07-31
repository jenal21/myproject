import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import { addExpense } from '../../services/expensesService';

const ExpenseForm = ({ onAdd }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    try {
      const response = await addExpense({ title, amount }, token);
      if (onAdd) onAdd(response.data.expense); 
      setTitle('');
      setAmount('');
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
