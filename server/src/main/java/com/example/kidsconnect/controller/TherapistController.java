package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.service.TherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/therapist")
public class TherapistController {
    @Autowired
    TherapistService therapistService;

    @DeleteMapping("/{therapistId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long therapistId,
                                        @AuthenticationPrincipal UserPrinciple userDetails) {

        return therapistService.deleteTherapist(therapistId, userDetails);
    }

    // 부모 업데이트
    @PutMapping("/{therapistId}")
    public ResponseEntity<?> updateUser(@PathVariable Long therapistId,
                                        @RequestBody TherapistSignUpDto therapistSignUpDto,
                                        @AuthenticationPrincipal UserPrinciple userDetails) {
        return therapistService.updateTherapist(therapistId, therapistSignUpDto, userDetails);
    }

}
