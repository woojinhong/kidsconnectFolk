package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ChildSymptomRepository;
import com.example.kidsconnect.domain.ChildSymptom;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ChildSymptomService {

    private final ChildSymptomRepository childSymptomRepository;


    @Transactional(readOnly = true)
    public List<ChildSymptom> findByChildId(Long childId) {
        List<ChildSymptom> childSymptoms = childSymptomRepository.findByChildId(childId);
        if(childSymptoms == null) {
            throw new CustomException(CustomCode.NOT_FOUND_CHILD_SYMPTOM);
        }
        return childSymptoms;
    }


}
