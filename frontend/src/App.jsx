import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from "./Pages/registerpage";
import LoginPage from './Pages/loginpage';
import Dashboard from '../src/Pages/dashboard';
import History from '../src/Pages/history';
import AppNavbar from './assets/components/navbar';
import { useAuth } from './context/auth';
import ResetPassword from './Pages/resetpassword';
import MoodBoard from './Pages/moodboard';
import ForgotPassword from './Pages/forgotpassword';
import Reports from './Pages/report';


const App = () => {
  const { token } = useAuth();

  return (
    <>
      {token && <AppNavbar />}

      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/history" element={token ? <History /> : <Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/moodboard" element={<MoodBoard />} />
        <Route path="/reports" element={token ? <Reports /> : <Navigate to="/login" />} />

      


      </Routes>
    </>
  );
};

export default App;
