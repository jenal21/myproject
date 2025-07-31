import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/registerpage';
import LoginPage from './Pages/loginpage';
import Dashboard from '../src/Pages/dashboard';
import History from '../src/Pages/history';
import AppNavbar from './assets/components/navbar';
import { useAuth } from './context/auth';
import ForgotPasswordPage from "./Pages/forgotpasswordpage";
import AdvisorBot from "./Pages/advisorbot";
import MoodBoard from './Pages/moodboard';


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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="/advisor" element={token ? <AdvisorBot /> : <Navigate to="/login" />}  */}
        <Route path="/advisor" element={<AdvisorBot />} />
       <Route path="/moodboard" element={<MoodBoard />} />
      


      </Routes>
    </>
  );
};

export default App;
