// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://student-management-backend.onrender.com/api/students', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setStudents(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, idx) => (
          <li key={idx}>
            {student.fullName} - {student.course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
