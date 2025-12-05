import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense, updateExpense } from '../services/expenseService';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/auth';

const History = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDate, setEditDate] = useState('');

  const currentYear = new Date().getFullYear();
  const minYear = 2000;
  const maxYear = currentYear + 10;

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses(token);
      setExpenses(response.data);
      setFilteredExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      const updatedExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(updatedExpenses);
      applyFilters(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const applyFilters = (data = expenses) => {
    let result = data;
    if (selectedMonth) {
      result = result.filter(
        (exp) => new Date(exp.date).getMonth() + 1 === parseInt(selectedMonth)
      );
    }
    if (selectedYear) {
      result = result.filter(
        (exp) => new Date(exp.date).getFullYear() === parseInt(selectedYear)
      );
    }
    setFilteredExpenses(result);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedMonth, selectedYear]);

  const groupByDate = (data) => {
    const grouped = {};
    data.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(expense);
    });
    return grouped;
  };

  const groupedExpenses = groupByDate(filteredExpenses);

  const startEdit = (expense) => {
    setEditId(expense._id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
    setEditDate(expense.date.split('T')[0]); 
  };

  
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditAmount('');
    setEditCategory('');
    setEditDate('');
  };

  const saveEdit = async (id) => {
    try {
      await updateExpense(
        id,
        {
          title: editTitle,
          amount: editAmount,
          category: editCategory,
          date: editDate,
        },
        token
      );

      
      const updatedExpenses = expenses.map((exp) =>
        exp._id === id
          ? {
              ...exp,
              title: editTitle,
              amount: editAmount,
              category: editCategory,
              date: editDate,
            }
          : exp
      );
      setExpenses(updatedExpenses);
      applyFilters(updatedExpenses);
      cancelEdit();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Expense History</h2>

      

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-muted text-center">No expenses found.</p>
      ) : (
        Object.entries(groupedExpenses).map(([date, items]) => {
          const total = items.reduce((acc, curr) => acc + Number(curr.amount), 0);
          return (
            <div key={date} className="mb-4">
              <h5 className="text-dark">{date}</h5>
              {items.map((expense) => (
                <Card key={expense._id} className="mb-2 shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        {editId === expense._id ? (
                          <>
                            <Form.Control
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="mb-2"
                            />
                            <Form.Control
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="mb-2"
                            />
                            <Form.Control
                              type="text"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="mb-2"
                              placeholder="Category"
                            />
                            <Form.Control
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="mb-2"
                            />
                          </>
                        ) : (
                          <>
                            <Card.Title>{expense.title}</Card.Title>
                            <Card.Text className='text-dark'>
                              <strong >Amount:</strong> ₹{expense.amount} <br />
                              <strong>Category:</strong> {expense.category}
                            </Card.Text>
                          </>
                        )}
                      </Col>
                      <Col md={4} className="d-flex align-items-center justify-content-end">
                        {editId === expense._id ? (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => saveEdit(expense._id)}
                              className="me-2"
                            >
                              Save
                            </Button>
                            <Button variant="secondary" size="sm" onClick={cancelEdit}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => startEdit(expense)}
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(expense._id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <h6 className="text-dark mt-2">Total: ₹{total}</h6>
              <hr />
            </div>
          );
        })
      )}
    </Container>
  );
};

export default History;
