import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/EventFeedbackForm.module.css";

const departments = [
  "CSE",
  "CIVIL",
  "AIDS",
  "MECH",
  "CSBS",
  "BIOCHEMICAL",
  "BIOTECH",
  "BIOMEDICAL",
];

function EventFeedbackForm() {
  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [department, setDepartment] = useState(departments[0]); // default to first dept
  const [eventName, setEventName] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sentiment = await analyzeSentiment(comments);
    const data = {
      studentName,
      regNo,
      department,
      eventName,
      rating,
      comments,
      sentiment,
    };

    try {
      const res = await axios.post("http://localhost:8080/feedback/event", data);
      setMessage(res.data);
      setStudentName("");
      setRegNo("");
      setDepartment(departments[0]);
      setEventName("");
      setRating(5);
      setComments("");
    } catch (err) {
      setMessage("Submission failed");
    }
  };
  const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post("http://localhost:5001/analyze-sentiment", { text });
    return response.data.sentiment;  // "positive", "neutral", or "negative"
  } catch (error) {
    console.error("Sentiment API error:", error);
    return "neutral"; // fallback
  }
};


  return (
    <div className={styles.eventFeedbackContainer}>
      <h2 className={styles.eventFeedbackHeading}>Event Feedback</h2>

      <form onSubmit={handleSubmit} className={styles.eventFeedbackForm}>
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
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>

        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </label>

        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
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

        <button type="submit">Submit Event Feedback</button>
      </form>

      {message && <p className={styles.eventFeedbackMessage}>{message}</p>}
    </div>
  );
}

export default EventFeedbackForm;
