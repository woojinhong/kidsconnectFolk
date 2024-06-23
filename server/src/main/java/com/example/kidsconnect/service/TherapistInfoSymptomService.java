package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistInfoSymptomRepository;

import com.example.kidsconnect.domain.TherapistInfoSymptom;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
@RequiredArgsConstructor
public class TherapistInfoSymptomService {
    private final TherapistInfoSymptomRepository therapistInfoSymptomRepository;

    public List<TherapistInfoSymptom> findByTherapistInfoId(Long therapistInfoId) {
        return therapistInfoSymptomRepository.findByTherapistInfoId(therapistInfoId);
    }
}
