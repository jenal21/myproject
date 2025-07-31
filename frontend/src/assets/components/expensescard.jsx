import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ExpensesCard = ({ expense, onDelete }) => {
  const { title, amount, category, date, _id } = expense;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {title}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(_id)}
          >
            Delete
          </Button>
        </Card.Title>
        <Card.Text>
          <strong>Amount:</strong> ₹{amount} <br />
          <strong>Category:</strong> {category} <br />
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExpensesCard;
