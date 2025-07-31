import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { getExpenses, deleteExpense } from '../../services/expenseService';
import { useAuth } from '../../context/auth';

const ExpensesList = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses(token);
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <Row>
      {expenses.length === 0 ? (
        <p className="text-muted">No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <Col key={expense._id} md={4} className="mb-4">
            <Card className="shadow-sm border-primary">
              <Card.Body>
                <Card.Title className="text-primary">{expense.title}</Card.Title>
                <Card.Text>
                  <strong>Amount:</strong> ₹{expense.amount}
                  <br />
                  <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                  <br />
                  <strong>Category:</strong> {expense.category}
                </Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default ExpensesList;
