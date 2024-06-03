package com.example.kidsconnect.controller;

import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

//    @PostMapping("/api/v1/match")
//    public ResponseEntity<?> match(@RequestBody MatchRequestDto matchRequestDto) {
//        // 매칭 서비스를 호출하여 매칭된 치료사 리스트를 받아옴
//        List<TherapistInfoDto> matchedTherapists = matchService.findMatchedTherapists(matchRequestDto);
//
//        // 매칭된 치료사 리스트를 응답으로 반환
//        return ResponseEntity.ok(matchedTherapists);
//    }
}