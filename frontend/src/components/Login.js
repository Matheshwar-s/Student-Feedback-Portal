import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";

function Login({ onLogin }) {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        regNo,
        password,
      });

      if (response.data === "INVALID") {
        setError("Invalid credentials.");
      } else {
        onLogin(response.data);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <h1 className={styles.title}>Student Feedback Portal</h1>
      <p className={styles.subtitle}>Enter your credentials</p>

      <input
        type="text"
        placeholder="Registration Number / Admin ID"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button className={styles.loginBtn} onClick={handleLogin}>
        Login
      </button>

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}

export default Login;
