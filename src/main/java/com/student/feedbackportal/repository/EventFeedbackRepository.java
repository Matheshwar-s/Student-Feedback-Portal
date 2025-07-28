package com.student.feedbackportal.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.student.feedbackportal.model.EventFeedback;

public interface EventFeedbackRepository extends JpaRepository<EventFeedback, Long> {
}