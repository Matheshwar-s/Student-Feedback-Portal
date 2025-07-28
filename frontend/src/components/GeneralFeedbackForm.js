import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/GeneralFeedbackForm.module.css";

const departments = [
  "CSE", "CIVIL", "AIDS", "MECH", "CSBS", "BIOCHEMICAL", "BIOTECH", "BIOMEDICAL"
];

function GeneralFeedbackForm() {
  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [facultyList, setFacultyList] = useState([]);
  const [facultyName, setFacultyName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/faculty/all")
      .then((res) => setFacultyList(res.data))
      .catch((err) => console.error("Error fetching faculty list", err));
  }, []);

  useEffect(() => {
    const selectedFaculty = facultyList.find((f) => f.facultyName === facultyName);
    setFacultyId(selectedFaculty ? selectedFaculty.facultyId : "");
  }, [facultyName, facultyList]);

  const analyzeSentiment = async (text) => {
    try {
      const response = await axios.post("http://localhost:5001/analyze-sentiment", { text });
      console.log("🧠 Sentiment Response:", response.data);
      return response.data.sentiment;
    } catch (error) {
      console.error("Sentiment API error:", error);
      return "neutral"; // fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sentiment = await analyzeSentiment(comments); // Make sure this finishes before sending data

    const data = {
      studentName,
      regNo,
      department,
      facultyName,
      facultyId,
      rating,
      comments,
      sentiment
    };

    console.log("📤 Sending Feedback Data:", data); // ✅ Add this log

    try {
      const res = await axios.post("http://localhost:8080/feedback/general", data);
      setMessage(res.data);

      // Reset form
      setStudentName("");
      setRegNo("");
      setDepartment(departments[0]);
      setFacultyName("");
      setFacultyId("");
      setRating(5);
      setComments("");
    } catch (err) {
      setMessage("Submission failed");
      console.error("Submit Error:", err);
    }
  };

  return (
    <div className={styles.generalFeedbackContainer}>
      <h2 className={styles.generalFeedbackHeading}>General Feedback</h2>

      <form onSubmit={handleSubmit} className={styles.generalFeedbackForm}>
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </label>

        <label>
          Registration No:
          <input
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
          />
        </label>

        <label>
          Department:
          <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </label>

        <label>
          Faculty Name:
          <select value={facultyName} onChange={(e) => setFacultyName(e.target.value)} required>
            <option value="">-- Select Faculty --</option>
            {facultyList.map((faculty) => (
              <option key={faculty.facultyId} value={faculty.facultyName}>
                {faculty.facultyName} ({faculty.facultyId})
              </option>
            ))}
          </select>
        </label>

        <label>
          Faculty ID:
          <input type="text" value={facultyId} readOnly />
        </label>

        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label>
          Comments:
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit General Feedback</button>
      </form>

      {message && <p className={styles.generalFeedbackMessage}>{message}</p>}
    </div>
  );
}

export default GeneralFeedbackForm;
