import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToExcel, exportToPDF } from "../../utils/exportUtils";
import styles from "../../styles/GeneralFeedbackList.module.css";

function GeneralFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const fetchData = () => {
    axios
      .get("http://localhost:8080/feedback/general-feedback/all")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching general feedbacks", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:8080/feedback/general-feedback/delete/${id}`);
        fetchData(); // refresh after delete
      } catch (err) {
        console.error("Failed to delete feedback", err);
        alert("Delete failed. Please try again.");
      }
    }
  };

  const filtered = feedbacks.filter(
    (f) =>
      f.studentName.toLowerCase().includes(search.toLowerCase()) ||
      f.regNo.toLowerCase().includes(search.toLowerCase()) ||
      f.facultyName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>General Feedbacks</h2>

      <input
        type="text"
        placeholder="Search by student, reg no, faculty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.buttonGroup}>
        <button
          className={styles.btn}
          onClick={() => exportToExcel(filtered, "General_Feedbacks")}
        >
          Export to Excel
        </button>
        <button
          className={styles.btn}
          onClick={() =>
            exportToPDF(
              [
                "studentName",
                "regNo",
                "department",
                "facultyName",
                "facultyId",
                "date",
                "rating",
                "comments",
                "Response",
              ],
              filtered,
              "General Feedbacks"
            )
          }
        >
          Export to PDF
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Reg No</th>
            <th>Department</th>
            <th>Faculty</th>
            <th>Faculty ID</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Comments</th>
            <th>Responce</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? (
            paginated.map((f, idx) => (
              <tr
                key={f.id || idx}
                className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{f.studentName}</td>
                <td>{f.regNo}</td>
                <td>{f.department}</td>
                <td>{f.facultyName}</td>
                <td>{f.facultyId}</td>
                <td>{f.date}</td>
                <td>{f.rating}</td>
                <td>{f.comments}</td>
                <td>
  <span
    style={{
      color:
        f.sentiment === "positive" ? "green" :
        f.sentiment === "negative" ? "red" :
        "gray",
      fontWeight: "bold",
    }}
  >
    {f.sentiment}
  </span>
</td>

                <td>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(f.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className={styles.noData}>
                No feedback found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={styles.pageBtn}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`${styles.pageBtn} ${
                page === i + 1 ? styles.activePage : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={styles.pageBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default GeneralFeedbackList;
