import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/AdminDashboard.module.css';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>
      <div className={styles.grid}>
        <button className={styles.button} onClick={() => navigate('/admin/add-user')}>
          ➕ Add User
        </button>
        <button className={styles.button} onClick={() => navigate('/admin/view-users')}>
          👨‍🎓 View Users
        </button>
        <button className={styles.button} onClick={() => navigate('/admin/add-faculty')}>
          ➕ Add Faculty
        </button>
        <button className={styles.button} onClick={() => navigate('/admin/view-faculty')}>
          👨‍🏫 View Faculty
        </button>
        <button className={styles.button} onClick={() => navigate('/admin/general-feedbacks')}>
          📝 General Feedbacks
        </button>
        <button className={styles.button} onClick={() => navigate('/admin/event-feedbacks')}>
          📢 Event Feedbacks
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
