import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/FacultyList.module.css";

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/faculty/all");
      setFaculties(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching faculty list", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filteredList = faculties.filter(
      (f) =>
        f.facultyName.toLowerCase().includes(term) ||
        f.facultyId.toLowerCase().includes(term) ||
        f.department.toLowerCase().includes(term)
    );
    setFiltered(filteredList);
    setPage(1);
  }, [searchTerm, faculties]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:8080/faculty/delete/${id}`);
        fetchData();
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete item.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Faculty List</h2>

      <input
        type="text"
        placeholder="Search by name, ID, department..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Faculty Name</th>
            <th>Faculty ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? (
            paginated.map((f, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{f.id}</td>
                <td>{f.facultyName}</td>
                <td>{f.facultyId}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(f.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.noData}>
                No faculty found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? styles.activePage : styles.pageButton}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FacultyList;
