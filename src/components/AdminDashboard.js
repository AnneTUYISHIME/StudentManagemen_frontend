import React, { useState } from 'react';

const AdminDashboard = () => {
  const [courseFilter, setCourseFilter] = useState('');

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '1234567890',
      enrollmentYear: '2022',
      course: 'Computer Science',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '0987654321',
      enrollmentYear: '2023',
      course: 'Information Systems',
    },
    {
      id: 3,
      name: 'Charlie Lee',
      email: 'charlie@example.com',
      phone: '1122334455',
      enrollmentYear: '2023',
      course: 'Computer Science',
    },
  ];

  const filteredStudents = courseFilter
    ? students.filter((student) => student.course === courseFilter)
    : students;

  const handleFilterChange = (e) => {
    setCourseFilter(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard – All Students</h1>

      <div style={styles.topBar}>
        <select style={styles.select} onChange={handleFilterChange} value={courseFilter}>
          <option value="">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Systems">Information Systems</option>
        </select>

        <button style={styles.addButton}>➕ Create Student</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Enrollment Year</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} style={styles.tr}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.email}</td>
              <td style={styles.td}>{student.phone}</td>
              <td style={styles.td}>{student.enrollmentYear}</td>
              <td style={styles.td}>{student.course}</td>
              <td style={styles.td}>
                <button style={styles.editButton}>Edit</button>
                <button style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7ff',
    minHeight: '100vh',
  },
  heading: {
    color: '#1f3b8c',
    fontSize: '28px',
    marginBottom: '20px',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '8px 15px',
    backgroundColor: '#1f3b8c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px',
    backgroundColor: '#1f3b8c',
    color: '#fff',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
  },
  tr: {
    transition: 'background-color 0.2s',
  },
  editButton: {
    marginRight: '10px',
    padding: '6px 10px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
