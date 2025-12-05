import { useState } from "react";
import { loginUser } from "../services/authservice";
import { useAuth } from "../context/auth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="mb-4 text-center text-primary">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className='text-dark'>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className='text-dark'>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>


          <div className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>

          <div className="text-center">
            <Link to="/forgot-password">Forgot Password?</Link>
            <br />
            <Link to="/register">Sign up</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default LoginPage;
