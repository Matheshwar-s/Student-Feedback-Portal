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
@Table(name = "general_feedback")
public class GeneralFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String regNo;
    private String department;
    private String facultyName;
    private String facultyId;

    private LocalDate date;

    private int rating;

    @Column(length = 1000)
    private String comments;

    @Column
    private String sentiment;
}
