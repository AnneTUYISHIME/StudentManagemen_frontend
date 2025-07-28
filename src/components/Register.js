// src/components/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [role, setRole] = useState('student');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input type="text" name="fullName" required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" name="email" required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" name="password" required className="w-full px-4 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select name="role" value={role} onChange={handleRoleChange} required className="w-full px-4 py-2 border rounded-md">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === 'student' && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Enrollment Year</label>
              <input type="number" name="enrollmentYear" required className="w-full px-4 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Course</label>
              <input type="text" name="course" required className="w-full px-4 py-2 border rounded-md" />
            </div>
          </>
        )}

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
