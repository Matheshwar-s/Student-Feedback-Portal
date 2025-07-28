package com.student.feedbackportal.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.student.feedbackportal.model.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByRegNoAndPassword(String regNo, String password);
    boolean existsByRegNo(String regNo);

}