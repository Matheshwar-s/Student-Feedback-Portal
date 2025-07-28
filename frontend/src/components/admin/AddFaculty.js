import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/AddFaculty.module.css";

function AddFaculty() {
  const [facultyName, setFacultyName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { facultyName, facultyId, department };
      const res = await axios.post("http://localhost:8080/faculty/add", data);
      setMessage(res.data);
      setIsError(false);
      setFacultyName("");
      setFacultyId("");
      setDepartment("");
    } catch (err) {
      setIsError(true);
      if (err.response?.status === 409) {
        setMessage("Faculty with this ID already exists.");
      } else {
        setMessage("Error while adding faculty.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Faculty</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Faculty Name:</label>
        <input
          className={styles.input}
          type="text"
          value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)}
          required
        />

        <label className={styles.label}>Faculty ID:</label>
        <input
          className={styles.input}
          type="text"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          required
        />

        <label className={styles.label}>Department:</label>
        <input
          className={styles.input}
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <button className={styles.button} type="submit">
          Add Faculty
        </button>
      </form>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddFaculty;
