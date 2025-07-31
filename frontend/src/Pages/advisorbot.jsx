import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const AdvisorBot = () => {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");

  const getAdvice = (query) => {
    query = query.toLowerCase();

    if (query.includes("phone") && query.includes("₹5000")) {
      return "Buying a new phone under ₹5000 might not give you good quality. Consider saving more.";
    } else if (query.includes("trip") || query.includes("travel")) {
      return "Make sure your essential expenses are covered first. If you have savings left, go for it!";
    } else if (query.includes("investment") || query.includes("invest")) {
      return "Great idea! Consider SIPs, mutual funds, or fixed deposits based on your risk appetite.";
    } else if (query.includes("gift")) {
      return "Gifting is nice, but ensure it fits your budget without hurting essentials.";
    } else if (query.includes("save")) {
      return "Start with 20% of your income. Keep tracking and increase gradually.";
    } else {
      return "Based on your question, it's important to balance essentials, wants, and savings. Spend wisely!";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = getAdvice(question);
    setAdvice(response);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Ask Expense Advisor Bot</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="e.g. I have ₹5000, should I buy a new phone?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3" type="submit">
            Get Advice
          </Button>
        </Form>

        {advice && (
          <Card className="mt-4 p-3 bg-light">
            <strong>Advice:</strong> <br />
            {advice}
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default AdvisorBot;
