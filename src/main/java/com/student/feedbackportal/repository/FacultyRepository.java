package com.student.feedbackportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.feedbackportal.model.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    boolean existsByFacultyId(String facultyId);
}
