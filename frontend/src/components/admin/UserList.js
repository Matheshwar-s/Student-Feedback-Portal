import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/UserList.module.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/users/all");
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (regNo) => {
    if (window.confirm(`Are you sure you want to delete user ${regNo}?`)) {
      try {
        await axios.delete(`http://localhost:8080/auth/users/delete/${regNo}`);
        fetchUsers(); // refresh list after deletion
      } catch (err) {
        alert("Failed to delete user.");
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User List</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Registration No</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className={styles.noData}>No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.regNo}>
                  <td>{user.regNo}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(user.regNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
