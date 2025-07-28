package com.student.feedbackportal.controller;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

import com.student.feedbackportal.model.EventFeedback;
import com.student.feedbackportal.model.GeneralFeedback;
import com.student.feedbackportal.repository.EventFeedbackRepository;
import com.student.feedbackportal.repository.GeneralFeedbackRepository;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private GeneralFeedbackRepository generalFeedbackRepository;

    @Autowired
    private EventFeedbackRepository eventFeedbackRepository;

    @PostMapping("/general")
public ResponseEntity<?> saveGeneralFeedback(@RequestBody GeneralFeedback feedback) {
    System.out.println("➡️ Received Comments: " + feedback.getComments());
    System.out.println("➡️ Received Sentiment: " + feedback.getSentiment());

    feedback.setDate(LocalDate.now()); // Make sure you're setting the date

    generalFeedbackRepository.save(feedback);
    return ResponseEntity.ok("Feedback saved successfully!");
}


    @PostMapping("/event")
    public String submitEventFeedback(@RequestBody EventFeedback feedback) {
        feedback.setDate(LocalDate.now());
        eventFeedbackRepository.save(feedback);
        return "Event feedback submitted successfully";
    }
    
    @GetMapping("/general-feedback/all")
public List<GeneralFeedback> getAllGeneralFeedback() {
    return generalFeedbackRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
}

@GetMapping("/event-feedback/all")
public List<EventFeedback> getAllEventFeedback() {
    return eventFeedbackRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
}
@DeleteMapping("/general-feedback/delete/{id}")
public ResponseEntity<String> deleteGeneralFeedback(@PathVariable Long id) {
    if (generalFeedbackRepository.existsById(id)) {
        generalFeedbackRepository.deleteById(id);
        return ResponseEntity.ok("Feedback deleted successfully");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback not found");
    }
}
@DeleteMapping("/event-feedback/delete/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        Optional<EventFeedback> feedbackOpt = eventFeedbackRepository.findById(id);
        if (feedbackOpt.isPresent()) {
            eventFeedbackRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Feedback with id " + id + " not found");
        }
    }


}