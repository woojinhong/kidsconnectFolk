package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.EnrolRepository;
import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.Enrol;
import com.example.kidsconnect.domain.Reservation;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrolService {

    private final EnrolRepository enrolRepository;
    @Transactional(readOnly = true)
    public List<Enrol> findByTherapistId(Long Id) {
        List<Enrol> enrol = enrolRepository.findByTherapistId(Id);
        if (enrol.isEmpty()) {
            throw new CustomException(CustomCode.NOT_FOUND_THERAPIST_SYMPTOM);
        }
        return enrol;

    }
}
