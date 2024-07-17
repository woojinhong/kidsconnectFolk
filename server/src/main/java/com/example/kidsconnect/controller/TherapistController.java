package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.*;
import com.example.kidsconnect.service.TherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/therapist")
public class TherapistController {
    @Autowired
    TherapistService therapistService;


    @GetMapping()
    public TherapistResponseDto showUser(@AuthenticationPrincipal UserPrinciple userDetails) {
        return therapistService.getTherapist(userDetails);
    }
    @GetMapping("/showAll")
    public ResponseEntity<List<Long>> getAllTherapistIds() {
        List<Long> therapistIds = therapistService.getAllTherapistIds();
        return ResponseEntity.ok(therapistIds);
    }
    @GetMapping("/{therapistId}")
    public TherapistResponseDto showTherapist(@PathVariable Long therapistId) {
        return therapistService.showTherapist(therapistId);
    }
    //치료사 삭제
    @DeleteMapping()
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserPrinciple userDetails) {

        return therapistService.deleteTherapist(userDetails);
    }

    // 치료사 업데이트
    @PutMapping()
    public ResponseEntity<?> updateUser(@RequestBody TherapistSignUpDto therapistSignUpDto,
                                        @AuthenticationPrincipal UserPrinciple userDetails) {
        return therapistService.updateTherapist(therapistSignUpDto, userDetails);
    }

}
