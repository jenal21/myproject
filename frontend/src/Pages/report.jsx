import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";

const Reports = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    title: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: filters, // pass filters as query params
      };
      const res = await axios.get("/api/expenses/report", config);
      setExpenses(res.data.expenses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-warning">Expense Reports</h2>

      <Form className="mb-4">
        <Row className="align-items-end g-2">
          <Col xs={6} sm={3} md={2}>
            <Form.Label>Date From</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
          </Col>

          <Col xs={6} sm={3} md={2}>
            <Form.Label>Date To</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
          </Col>

          <Col xs={6} sm={3} md={2}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              name="category"
              value={filters.category}
              onChange={handleChange}
            />
          </Col>

          <Col xs={6} sm={3} md={2}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={filters.title}
              onChange={handleChange}
            />
          </Col>

          <Col xs={12} sm={12} md={2}>
            <Button
              variant="primary"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                fetchExpenses();
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <div className="alert alert-danger">{error}</div>}

      
      <Table
        striped
        bordered
        hover
        responsive
        className="shadow-sm"
        style={{ minWidth: "600px" }}
      >
        <thead className="table-primary">
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th className="text-end">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {!loading && expenses.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-3">
                No expenses found.
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan="4" className="text-center py-3">
                Loading...
              </td>
            </tr>
          )}
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td className="text-end">{expense.amount}</td>
            </tr>
          ))}
        </tbody>
        {expenses.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-bold">
                Total:
              </td>
              <td className="text-end fw-bold">{totalAmount}</td>
            </tr>
          </tfoot>
        )}
      </Table>
    </Container>
  );
};

export default Reports;
