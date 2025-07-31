// import React, { useState } from 'react';
// import { Form, Button, Card, Row, Col } from 'react-bootstrap';
// import { useAuth } from '../../context/auth';
// import { addExpense } from '../../services/expenseService';

// const ExpensesForm = ({ onAdd }) => {
//   const { token } = useAuth();
//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     category: '',
//     date: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addExpense(formData, token);
//       onAdd(response.data.expense);
//       setFormData({
//         title: '',
//         amount: '',
//         category: '',
//         date: '',
//       });
//     } catch (err) {
//       console.error('Error adding expense:', err);
//     }
//   };

//   return (
//     <Card className="p-4 shadow mb-4 bg-light">
//       <h4 className="text-primary mb-3">Add New Expense</h4>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter expense title"
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="amount"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 placeholder="Enter amount"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="e.g. Food, Travel"
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <div className="d-grid">
//           <Button variant="success" type="submit">
//             Add Expense
//           </Button>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default ExpensesForm;

import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // <-- ADD THIS
import { useAuth } from '../../context/auth';
import { addExpense } from '../../services/expenseService';

const ExpenseForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate(); // <-- USE THIS
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(formData, token); // add expense
      navigate('/history'); // <-- REDIRECT HERE
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Add New Expense</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter expense title"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Food, Travel"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;
