package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistInfoRepository;
import com.example.kidsconnect.domain.TherapistInfo;
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


    public List<TherapistInfo> findTherapistInfoWithExperience(){
        return therapistInfoRepository.findTherapistInfoWithExperiences(1L);
    }
    public List<TherapistInfo> findGraphTherapistInfoWithExperience(){
        return therapistInfoRepository.findAllById(1L);
    }

    @Transactional(readOnly = true)
    public List<MatchResponseDto> findTherapistsByCriteria(MatchRequestDto matchRequestDto) {
        // 1. therapistInfoRepository.findTherapistsByCriteria 호출
        return therapistInfoRepository.findTherapistsByCriteria(matchRequestDto);
    }

//    private TherapistInfoDto mapToTherapistInfoDto(TherapistInfo therapist) {
//        // TherapistInfo를 TherapistInfoDto로 변환하는 코드
//    }

}