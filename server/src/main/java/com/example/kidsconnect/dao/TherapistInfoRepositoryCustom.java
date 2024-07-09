package com.example.kidsconnect.dao;

import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.example.kidsconnect.dto.TherapistInfoFilterDto;
import com.example.kidsconnect.dto.TopTherapistResponseDto;

import java.util.List;

public interface TherapistInfoRepositoryCustom {
    List<MatchResponseDto> findTherapistsByCriteria(MatchRequestDto matchRequestDto);
    List<MatchResponseDto> findTherapistInfoByFilter(TherapistInfoFilterDto filterDto);

    List<TopTherapistResponseDto> findTopTherapistsOfMonth();




}
