package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.dto.ChildDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.service.TherapistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/survey")
@RequiredArgsConstructor
public class SurveyController {
    private final TherapistService therapistService;

//    @PostMapping("/treatment")
//    public ResponseEntity<?> match(@RequestBody MatchingRequest request){
//        List<Therapist> matchedTherapists = therapistService.findMatchedTherapists(request);
//        return ResponseEntity.ok(matchedTherapists);
//
//    }
}
