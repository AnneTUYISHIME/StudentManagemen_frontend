// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/StudentDashboard';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password/:token" element={<ResetPassword />} />
       
        


      </Routes>
    </Router>
  );
}

export default App;
