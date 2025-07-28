import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToExcel, exportToPDF } from "../../utils/exportUtils";
import styles from "../../styles/EventFeedbackList.module.css";

function EventFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // change if you want

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    axios
      .get("http://localhost:8080/feedback/event-feedback/all")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching event feedbacks", err));
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:8080/feedback/event-feedback/delete/${id}`);
        // After delete, refresh list locally (better UX than refetch)
        setFeedbacks(feedbacks.filter((f) => f.id !== id));
      } catch (err) {
        console.error("Failed to delete event feedback", err);
        alert("Delete failed. Please try again.");
      }
    }
  };

  // Filter feedbacks by search text
  const filtered = feedbacks.filter(
    (f) =>
      f.studentName.toLowerCase().includes(search.toLowerCase()) ||
      f.regNo.toLowerCase().includes(search.toLowerCase()) ||
      f.eventName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedFeedbacks = filtered.slice(startIdx, startIdx + rowsPerPage);

  // Handlers for pagination
  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // Reset to page 1 on new search input
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Event Feedbacks</h2>

      <input
        type="text"
        placeholder="Search by student, reg no, event..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.buttonGroup}>
        <button
          className={styles.btn}
          onClick={() => exportToExcel(filtered, "Event_Feedbacks")}
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
                "eventName",
                "date",
                "rating",
                "comments",
              ],
              filtered,
              "Event Feedbacks"
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
            <th>Event</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Comments</th>
            <th>Response</th>
            <th>Action</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {paginatedFeedbacks.length > 0 ? (
            paginatedFeedbacks.map((f, idx) => (
              <tr
                key={startIdx + idx}
                className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{f.studentName}</td>
                <td>{f.regNo}</td>
                <td>{f.department}</td>
                <td>{f.eventName}</td>
                <td>{f.date}</td>
                <td>{f.rating}</td>
                <td>{f.comments}</td>
                <td>
  <span className={
    f.sentiment === "positive" ? styles.responsePositive :
    f.sentiment === "negative" ? styles.responseNegative :
    styles.responseNeutral
  }>
    {f.sentiment}
  </span>
</td>


                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(f.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className={styles.noData}>
                No feedback found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageBtn} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EventFeedbackList;
