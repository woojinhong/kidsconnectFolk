package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistInfoRepository;
import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchService {

//    private final TherapistInfoRepository therapistInfoRepository;
//    public List<TherapistInfoDto> findMatchedTherapists(MatchRequestDto matchRequestDto) {
//        return therapistInfoRepository.findMatchedTherapists(
//                        matchRequestDto.getExperience(),
//                        matchRequestDto.getSpeciality(),
//                        matchRequestDto.getGender(),
//                        matchRequestDto.getAddress()
//                ).stream()
//                .map(this::mapToTherapistInfoDto)
//                .collect(Collectors.toList());
//    }

//    private TherapistInfoDto mapToTherapistInfoDto(TherapistInfo therapist) {
//        // TherapistInfo를 TherapistInfoDto로 변환하는 코드
//    }
}
