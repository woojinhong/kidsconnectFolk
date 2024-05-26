package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ChildRepository;
import com.example.kidsconnect.dao.ChildSymptomRepository;
import com.example.kidsconnect.dao.SymptomRepository;
import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.ChildSymptom;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.dto.ChildDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ChildMapper;
import com.example.kidsconnect.mapping.SymptomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChildService {

    private final ChildRepository childRepository;
    private final SymptomRepository symptomRepository;
    private final ChildSymptomRepository childSymptomRepository;
    private final ChildMapper childMapper;


    @Transactional
    public ResponseEntity<?> register(ChildDto childDto){
        Child child = childMapper.fromChildDto(childDto);

        // , 구분자 이용 json 문자열 -> long type list로 저장
        List<Long> symptomIds = childDto.getSymptomId();

        childRepository.save(child);

        //childId 데이터베이스 확인
        childRepository.findById(child.getId())
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        //child_symptom 저장
        for (Long symptomId : symptomIds) {
            Symptom symptom = symptomRepository.findById(symptomId)
                    .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));
            //mapstruct(x) builder(o) childSymptom 저장.
            ChildSymptom childSymptom = ChildSymptom.builder()
                    .child(child)
                    .symptom(symptom)
                    .build();
            childSymptomRepository.save(childSymptom);
        }

        return ResponseEntity.ok("아이 추가 성공");
    }


}
