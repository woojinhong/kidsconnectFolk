package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.SymptomRepository;
import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class SymptomService {
    private final SymptomRepository symptomRepository;

    @Transactional(readOnly = true)
    public Symptom findByName(String name) {
        return symptomRepository.findByName(name)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_SYMPTOM));
    }
}
