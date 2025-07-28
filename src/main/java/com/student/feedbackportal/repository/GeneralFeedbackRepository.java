package com.student.feedbackportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.feedbackportal.model.GeneralFeedback;

public interface GeneralFeedbackRepository extends JpaRepository<GeneralFeedback, Long> {
}