import React from 'react';
import { Container } from 'react-bootstrap';
import ExpenseForm from '../assets/components/expensesform';
import ExpensesList from '../assets/components/expenseslist';
// import AdvisorBot from './advisorbot';

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Dashboard</h2>
      <ExpenseForm />
      <hr />
      {/* <ExpensesList /> */}
      {/* <AdvisorBot /> */}
    </Container>
  );
};

export default Dashboard;
