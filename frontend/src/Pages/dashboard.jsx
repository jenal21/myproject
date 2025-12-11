import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import ExpenseForm from '../assets/components/expensesform';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');
 
    const API = `${import.meta.env.VITE_API_URL}/api/expenses`; 

    useEffect(() => {
    if (token) {
      axios
        .get(`${API}/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {console.log("API RESPONSE:", res.data);
          setExpenses(res.data.expenses || res.data || []);
        })
        .catch(err => console.error("Error fetching expenses:", err));
    }
  }, [token]);  

  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const backgroundColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#00C49F'
];

const data = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      label: 'Expenses by Category',
      data: Object.values(categoryTotals),
      backgroundColor: backgroundColors.slice(0, Object.keys(categoryTotals).length),
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Expense Overview',
      color: '#333',
      font: { size: 18, weight: 'bold' }
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          let value = context.raw || 0;
          return `₹${value.toLocaleString()}`;
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        font: { size: 14, weight: 'bold' },
        color: (context) => {
          return backgroundColors[context.index % backgroundColors.length];
        }
      }
    },
    y: {
      type: 'logarithmic',
      ticks: {
        callback: (value) => `₹${Number(value).toLocaleString()}`,
        font: { size: 12, weight: 'bold' },
        color: '#666'
      }
    }
  }
};



  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Dashboard</h2>

      
      <Card className="p-4 shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
        <ExpenseForm />
      </Card>

      
      <Card className="p-4 shadow-sm border-0" style={{ borderRadius: '12px', minHeight: '350px' }}>
        <div style={{ height: '300px' }}>
          <Bar
            key={JSON.stringify(categoryTotals)} 
            data={data}
            options={options}
          />
        </div>
      </Card>
    </Container>
  );
};

export default Dashboard;
