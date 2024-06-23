package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistInfoRepository;

import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
@RequiredArgsConstructor
public class TherapistInfoSearchService {

    private final TherapistInfoRepository therapistInfoRepository;

    @Transactional(readOnly = true)
    public List<MatchResponseDto> findTherapistsByCriteria(MatchRequestDto matchRequestDto) {
        System.out.println("Service - isExperience: " + matchRequestDto.getIsExperience()); // 디버그 출력
        System.out.println("Service - Symptoms: " + matchRequestDto.getSymptoms()); // 디버그 출력

        return therapistInfoRepository.findTherapistsByCriteria(matchRequestDto);
    }
}