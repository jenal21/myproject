import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/expenseService';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/auth';

const History = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

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

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Expense History</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Filter by Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>  
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select value={selectedYear} onChange={handleYearChange}>
            <option value="">Filter by Year</option>
            {[...Array(maxYear - minYear + 1)].map((_, i) => (
              <option key={minYear + i} value={minYear + i}>
                {minYear + i}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-muted text-center">No expenses found.</p>
      ) : (
        Object.entries(groupedExpenses).map(([date, items]) => {
          const total = items.reduce((acc, curr) => acc + Number(curr.amount), 0);
          return (
            <div key={date} className="mb-4">
              <h5 className="text-primary">{date}</h5>
              {items.map((expense) => (
                <Card key={expense._id} className="mb-2 shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Title>{expense.title}</Card.Title>
                        <Card.Text>
                          <strong>Amount:</strong> ₹{expense.amount} <br />
                          <strong>Category:</strong> {expense.category}
                        </Card.Text>
                      </Col>
                      <Col md={4} className="d-flex align-items-center justify-content-end">
                        
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(expense._id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <h6 className="text-success mt-2">Total: ₹{total}</h6>
              <hr />
            </div>
          );
        })
      )}
    </Container>
  );
};

export default History;
