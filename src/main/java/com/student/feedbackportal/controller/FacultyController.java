package com.student.feedbackportal.controller;

import java.util.List;

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

import com.student.feedbackportal.model.Faculty;
import com.student.feedbackportal.repository.FacultyRepository;

@RestController
@RequestMapping("/faculty")
@CrossOrigin(origins = "http://localhost:3000")
public class FacultyController {

    @Autowired
    private FacultyRepository facultyRepository;
     @PostMapping("/add")
    public ResponseEntity<String> addFaculty(@RequestBody Faculty faculty) {
        if (facultyRepository.existsByFacultyId(faculty.getFacultyId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Faculty with ID already exists");
        }
        facultyRepository.save(faculty);
        return ResponseEntity.ok("Faculty added successfully");
    }

    @GetMapping("/all")
    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }
    @DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteEntry(@PathVariable Long id) {
    facultyRepository.deleteById(id);
    return ResponseEntity.ok("Deleted successfully");
}

}