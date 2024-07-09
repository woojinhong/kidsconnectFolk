package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.UserPrinciple;

import com.example.kidsconnect.dto.ReviewDto;
import com.example.kidsconnect.service.ReviewService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/{therapistInfoId}")
    public ResponseEntity<?> addReview(@PathVariable Long therapistInfoId, @RequestBody ReviewDto reviewDTO, @AuthenticationPrincipal UserPrinciple userDetails) {
        return reviewService.addReview(therapistInfoId, reviewDTO, userDetails);
    }

    @GetMapping("/user")
    public List<ReviewDto> getUserReviews(@AuthenticationPrincipal UserPrinciple userDetails) {
        return reviewService.getReviewsByUser(userDetails);
    }

    @GetMapping("/therapist")
    public List<ReviewDto> getTherapistReviews(@AuthenticationPrincipal UserPrinciple userDetails) {
        return reviewService.getReviewsByTherapist(userDetails);
    }
}
