// src/components/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    enrollmentYear: ''
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('https://student-management-backend.onrender.com/api/students', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Student added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Student</h2>
      <input name="fullName" onChange={handleChange} placeholder="Full Name" />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" />
      <input name="phone" onChange={handleChange} placeholder="Phone" />
      <input name="course" onChange={handleChange} placeholder="Course" />
      <input name="registration number" onChange={handleChange} placeholder="registration number" />
      <input name="enrollmentYear" onChange={handleChange} placeholder="Enrollment Year" />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;
