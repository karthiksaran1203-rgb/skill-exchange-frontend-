// import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SkillsPage from './pages/SkillsPage';
import CreateSkillPage from './pages/CreateSkillPage';
import SkillDetailPage from './pages/SkillDetailPage';
import ExchangeRequestsPage from './pages/ExchangeRequestsPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {


  return (
    <>
        <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skills/create"
              element={
                <ProtectedRoute>
                  <CreateSkillPage />
                </ProtectedRoute>
              }
            />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/skills/:id" element={<SkillDetailPage />} />
            <Route
              path="/exchanges"
              element={
                <ProtectedRoute>
                  <ExchangeRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/users/:id" element={<UserProfilePage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
    </>
  );
}

export default App
