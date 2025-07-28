import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call with dummy data
  useEffect(() => {
    const dummyData = [
      {
        fullName: 'Anne Tuyishime',
        email: 'anne@example.com',
        phone: '0781234567',
        course: 'Web Development',
        enrollmentYear: 2024,
      },
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '0723456789',
        course: 'Data Science',
        enrollmentYear: 2023,
      },
    ];

    // Simulate delay
    setTimeout(() => {
      setStudents(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg mt-5">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Student List</h2>
      <ul className="space-y-4">
        {students.map((student, idx) => (
          <li key={idx} className="border p-4 rounded shadow-sm bg-gray-50">
            <p><strong>Name:</strong> {student.fullName}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Enrollment Year:</strong> {student.enrollmentYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
