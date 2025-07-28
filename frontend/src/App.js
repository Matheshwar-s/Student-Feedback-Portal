import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./components/Login";

// Student Components
import GeneralFeedbackForm from "./components/GeneralFeedbackForm";
import EventFeedbackForm from "./components/EventFeedbackForm";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import GeneralFeedbackList from "./components/admin/GeneralFeedbackList";
import EventFeedbackList from "./components/admin/EventFeedbackList";
import AddUser from "./components/admin/AddUser";
import UserList from "./components/admin/UserList";
import AddFaculty from "./components/admin/AddFaculty";
import FacultyList from "./components/admin/FacultyList";

import styles from '../src/styles/App.module.css';  // Assuming you save CSS here

function App() {
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({
    studentName: "John Doe",
    regNo: "22CS001",
    department: "Computer Science",
  });

  const handleLogout = () => {
    setRole("");
    setUserData({});
  };

  if (!role) {
    return (
      <Router>
        <div className={styles.appContainer}>
          <Login
            onLogin={(selectedRole) => {
              setRole(selectedRole);
            }}
          />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className={styles.appContainer}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>

        {role === "STUDENT" ? (
          <>
            <h2 className={styles.heading}>Welcome Student</h2>
            <nav className={styles.navButtons}>
              <button className={styles.navBtn}>
                <Link to="/student/general" className={styles.navLink}>General Feedback</Link>
              </button>
              <button className={styles.navBtn}>
                <Link to="/student/event" className={styles.navLink}>Event Feedback</Link>
              </button>
            </nav>

            <Routes>
              <Route path="/student/general" element={<GeneralFeedbackForm {...userData} />} />
              <Route path="/student/event" element={<EventFeedbackForm {...userData} />} />
              <Route path="*" element={<Navigate to="/student/general" />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/general-feedbacks" element={<GeneralFeedbackList />} />
              <Route path="/admin/event-feedbacks" element={<EventFeedbackList />} />
              <Route path="/admin/add-user" element={<AddUser />} />
              <Route path="/admin/view-users" element={<UserList />} />
              <Route path="/admin/add-faculty" element={<AddFaculty />} />
              <Route path="/admin/view-faculty" element={<FacultyList />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
