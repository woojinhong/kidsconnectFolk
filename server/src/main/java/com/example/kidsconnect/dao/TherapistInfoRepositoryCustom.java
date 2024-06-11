package com.example.kidsconnect.dao;

import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;

import java.util.List;

public interface TherapistInfoRepositoryCustom {
    List<MatchResponseDto> findTherapistsByCriteria(MatchRequestDto matchRequestDto);
}
