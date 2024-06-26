package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.example.kidsconnect.service.TherapistInfoSearchService;
import com.example.kidsconnect.service.TherapistInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class TherapistInfoSearchController {

    private final TherapistInfoSearchService therapistInfoSearchService;
    private final TherapistInfoService therapistInfoService;

    @PostMapping("/therapistInfo")
    public List<MatchResponseDto> getTherapistsByCriteria(@RequestBody MatchRequestDto matchRequestDto) {
        System.out.println("isExperience: " + matchRequestDto.getIsExperience()); // 디버그 출력
        System.out.println("Symptoms: " + matchRequestDto.getSymptoms()); // 디버그 출력
        return therapistInfoSearchService.findTherapistsByCriteria(matchRequestDto);
    }


    //총경력 엔드포인트
    @GetMapping("/totalExperience/{therapistInfoId}")
    public ResponseEntity<?> getTotalExperience(@PathVariable Long therapistInfoId) {
        String totalExperience = therapistInfoService.calculateTotalExperience(therapistInfoId);
        return ResponseEntity.ok(totalExperience);
    }

}