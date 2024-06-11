package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.service.MatchService;
import com.example.kidsconnect.service.TherapistInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/match")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;
    private final TherapistInfoService therapistInfoService;

    @PostMapping()
    public ResponseEntity<?> matchTherapist(MatchRequestDto matchRequestDto) {
        // 매칭 서비스를 호출하여 매칭된 치료사 리스트를 받아옴
        List<TherapistInfo> matchedTherapists = matchService.findTherapistInfoWithExperience();

        // 매칭된 치료사 리스트를 응답으로 반환
        return ResponseEntity.ok(matchedTherapists);
    }

    @PostMapping("/search")
    public List<MatchResponseDto> getTherapistsByCriteria(@RequestBody MatchRequestDto matchRequestDto) {
        return matchService.findTherapistsByCriteria(matchRequestDto);
    }


    //총경력 엔드포인트
    @GetMapping("/totalExperience/{therapistInfoId}")
    public ResponseEntity<?> getTotalExperience(@PathVariable Long therapistInfoId) {
        String totalExperience = therapistInfoService.calculateTotalExperience(therapistInfoId);
        return ResponseEntity.ok(totalExperience);
    }




}