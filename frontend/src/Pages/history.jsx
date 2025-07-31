import React, { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../services/expenseService';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../context/auth';


const History = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses(token);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Expense History</h2>
      <Row>
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          expenses.map((expense) => (
            <Col md={4} key={expense._id} className="mb-4">
              <Card className="shadow-sm border-info">
                <Card.Body>
                  <Card.Title>{expense.title}</Card.Title>
                  <Card.Text>
                    <strong>Amount:</strong> ₹{expense.amount}
                    <br />
                    <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                    <br />
                    <strong>Category:</strong> {expense.category}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(expense._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default History;
