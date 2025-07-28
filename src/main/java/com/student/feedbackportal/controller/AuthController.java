package com.student.feedbackportal.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.feedbackportal.model.User;
import com.student.feedbackportal.repository.UserRepository;

// DTO class to avoid exposing password when returning user data
class UserDto {
    private String regNo;
    private String role;

    public UserDto() {
    }

    public UserDto(String regNo, String role) {
        this.regNo = regNo;
        this.role = role;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User found = userRepository.findByRegNoAndPassword(user.getRegNo(), user.getPassword());
        if (found != null) {
            return found.getRole(); // Return "STUDENT" or "ADMIN"
        } else {
            return "INVALID";
        }
    }

    @PostMapping("/users/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        // Check if user with the same regNo exists
        if (userRepository.existsByRegNo(user.getRegNo())) {
            return ResponseEntity.status(409).body("User already exists with this regNo.");
        }

        // Save the new user
        userRepository.save(user);
        return ResponseEntity.ok("User added successfully");
    }

    @GetMapping("/users/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserDto> userDtos = users.stream()
            .map(user -> new UserDto(user.getRegNo(), user.getRole()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(userDtos);
    }
    @DeleteMapping("/users/delete/{regNo}")
public ResponseEntity<String> deleteUser(@PathVariable String regNo) {
    Optional<User> user = userRepository.findById(regNo);
    if (user.isPresent()) {
        userRepository.deleteById(regNo);
        return ResponseEntity.ok("User deleted successfully");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}


}
