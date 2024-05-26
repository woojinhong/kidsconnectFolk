package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.domain.TherapistInfoSymptom;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.service.TherapistInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/therapist/info")
@RequiredArgsConstructor
public class TherapistInfoController {

    private final TherapistInfoService therapistInfoService;

    @PostMapping()
    public ResponseEntity<?> createTherapistInfo(@RequestBody TherapistInfoDto therapistInfoDto){

        return therapistInfoService.addTherapistInfo(therapistInfoDto);
    }


    @PatchMapping()
    public ResponseEntity<?> updateTherapistInfo(@RequestBody TherapistInfoDto therapistInfoDto){
        return null;//therapistInfoServiceService.addTherapistInfo(ther)
    }
}
