package com.student.feedbackportal.model;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "event_feedback")
public class EventFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private String regNo;

    private String department;

    private String eventName;

    private int rating;

    @Column(length = 1000)
    private String comments;

    private LocalDate date;
    private String sentiment;

    // Getters and setters
    public String getSentiment() {
        return sentiment;
    }
    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }
}
