import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/AddUser.module.css';

function AddUser() {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('STUDENT');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { regNo, password, role };
      const res = await axios.post('http://localhost:8080/auth/users/add', data);
      setMessage(res.data);
      setRegNo('');
      setPassword('123456');
      setRole('STUDENT');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage('User already exists with this regNo.');
      } else {
        setMessage('Error while adding user.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New User</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Registration No:</label>
        <input
          className={styles.input}
          type="text"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
          placeholder="Enter registration number"
        />

        <label className={styles.label}>Password (default):</label>
        <input
          className={styles.input}
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
        />

        <label className={styles.label}>Role:</label>
        <select
          className={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="STUDENT">STUDENT</option>
          <option value="ADMIN">ADMIN</option>
          <option value="FACULTY">FACULTY</option>
        </select>

        <button className={styles.button} type="submit">
          Add User
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default AddUser;
