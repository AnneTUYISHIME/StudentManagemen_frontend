import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    course: "",
    enrollmentYear: "",
  });
  const [editingId, setEditingId] = useState(null); // null means adding new

  const token = localStorage.getItem("token");

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const url = courseFilter
        ? `https://student-managementsystem-6xz7.onrender.com/api/students?course=${courseFilter}`
        : "https://student-managementsystem-6xz7.onrender.com/api/students";

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
      alert("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [courseFilter]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update student
        await axios.put(
          `https://student-managementsystem-6xz7.onrender.com/api/students/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Student updated successfully");
      } else {
        // Create new student
        await axios.post(
          "https://student-managementsystem-6xz7.onrender.com/api/students",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Student created successfully");
      }
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        course: "",
        enrollmentYear: "",
      });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error("Failed to save student", error);
      alert("Failed to save student");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this student?")) return;

    try {
      await axios.delete(
        `https://student-managementsystem-6xz7.onrender.com/api/students/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Student deleted");
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
      alert("Failed to delete student");
    }
  };

  // Edit student (fill form)
  const handleEdit = (student) => {
    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      password: "", // leave blank for no password change
      course: student.course || "",
      enrollmentYear: student.enrollmentYear || "",
    });
    setEditingId(student._id);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      course: "",
      enrollmentYear: "",
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard – All Students</h1>

      <div style={styles.topBar}>
        <select style={styles.select} onChange={(e) => setCourseFilter(e.target.value)} value={courseFilter}>
          <option value="">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Systems">Information Systems</option>
        </select>

        <button style={styles.addButton} onClick={handleCancelEdit}>➕ Add New Student</button>
      </div>

      {/* Form for add/edit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20, backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
        <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required={!editingId} // required for new students
          disabled={!!editingId} // disable email editing for existing students for simplicity
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          name="password"
          placeholder={editingId ? "New Password (leave blank to keep)" : "Password"}
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          required={!editingId}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          type="number"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          value={formData.enrollmentYear}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#1f3b8c", color: "#fff", border: "none", borderRadius: 6 }}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: 10, padding: "10px 15px" }}>
            Cancel
          </button>
        )}
      </form>

      {/* Students Table */}
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
          {students.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: "center" }}>No students found</td></tr>
          ) : (
            students.map((student, index) => (
              <tr key={student._id} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{student.fullName}</td>
                <td style={styles.td}>{student.email}</td>
                <td style={styles.td}>{student.phone}</td>
                <td style={styles.td}>{student.enrollmentYear || "N/A"}</td>
                <td style={styles.td}>{student.course || "N/A"}</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => handleEdit(student)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7ff",
    minHeight: "100vh",
  },
  heading: {
    color: "#1f3b8c",
    fontSize: "28px",
    marginBottom: "20px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "8px 15px",
    backgroundColor: "#1f3b8c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  th: {
    padding: "12px",
    backgroundColor: "#1f3b8c",
    color: "#fff",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  tr: {
    transition: "background-color 0.2s",
  },
  editButton: {
    marginRight: "10px",
    padding: "6px 10px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 10px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
