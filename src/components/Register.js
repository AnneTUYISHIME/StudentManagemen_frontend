import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://student-managementsystem-6xz7.onrender.com/api/students/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(res.data);
      setProfilePicture(res.data.imageUrl);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
    // You can implement upload to Cloudinary here
  };

  if (!student)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Welcome, {student.fullName}</h1>
      <div style={styles.container}>
        {/* LEFT */}
        <div style={styles.leftPanel}>
          <label htmlFor="profile-upload" style={styles.uploadLabel}>
            <img
              src={profilePicture || "https://via.placeholder.com/150?text=Profile+Picture"}
              alt="Profile"
              style={styles.profileImage}
              title="Click to upload"
            />
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              style={{ display: "none" }}
            />
          </label>
          <div style={styles.uploadText}>Click image to update profile picture</div>
        </div>

        {/* RIGHT */}
        <div style={styles.rightPanel}>
          <h2 style={styles.sectionTitle}>Student Information</h2>
          <div style={styles.infoRow}>
            <span style={styles.label}>Full Name:</span> {student.fullName}
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Email:</span> {student.email}
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Phone:</span> {student.phone}
          </div>
          {student.role === "student" && (
            <>
              <div style={styles.infoRow}>
                <span style={styles.label}>Course:</span> {student.course || "N/A"}
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Enrollment Year:</span>{" "}
                {student.enrollmentYear || "N/A"}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    padding: "40px 20px",
    color: "#1f2937",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "40px",
    textAlign: "center",
    color: "#2563eb",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    gap: "60px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.15)",
  },
  leftPanel: {
    flex: "1",
    textAlign: "center",
  },
  uploadLabel: {
    cursor: "pointer",
    display: "inline-block",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #2563eb",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    transition: "transform 0.3s ease",
  },
  uploadText: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#6b7280",
  },
  rightPanel: {
    flex: "2",
    paddingTop: "10px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "24px",
    borderBottom: "2px solid #2563eb",
    paddingBottom: "8px",
    color: "#2563eb",
  },
  infoRow: {
    fontSize: "18px",
    marginBottom: "16px",
    lineHeight: "1.5",
  },
  label: {
    fontWeight: "700",
    color: "#374151",
    marginRight: "8px",
  },
};

export default StudentDashboard;
