package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ChildRepository;
import com.example.kidsconnect.dao.ChildSymptomRepository;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ChildRequestDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ChildMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChildService {

    private final ChildRepository childRepository;
    private final SymptomService symptomService;
    private final ChildSymptomRepository childSymptomRepository;
    private final UserService userService;
    private final ChildMapper childMapper;


    @Transactional
    public ResponseEntity<?> register(ChildRequestDto childRequestDto, UserPrinciple userDetails){
        //부모 정보 조회
        User user = userService.findById(userDetails.getId());

        //부모, childDto -> Child 엔티티로 변환
        Child child = childMapper.fromChildDto(childRequestDto, user);

        //child 저장
        childRepository.save(child);

        //증상 조회 , 아이증상 저장
        saveChildSymptoms(childRequestDto, child);

        return ResponseEntity.ok("아이 추가 성공");
    }

    //부모 id로 child 조회
    @Transactional(readOnly = true)
    public List<Child> getChildrenByUserId(Long userId) {
        return childRepository.findByUserId(userId);
    }


    // 증상이름 확인, 아이증상 저장
    private void saveChildSymptoms(ChildRequestDto childRequestDto, Child child) {

        List<String> symptomNames = childRequestDto.getSymptomName();
        if (symptomNames == null || symptomNames.isEmpty()) {
            return; // 아무 작업도 하지 않음
        }

        List<ChildSymptom> childSymptoms = new ArrayList<>();
        for (String symptomName : childRequestDto.getSymptomName()) {
            Symptom symptom = symptomService.findByName(symptomName);

            ChildSymptom childSymptom = ChildSymptom.builder()
                    .child(child)
                    .symptom(symptom)
                    .build();
            childSymptoms.add(childSymptom);
        }
        childSymptomRepository.saveAll(childSymptoms);
    }

    @Transactional(readOnly = true)
    public Child findById(Long id) {
        return childRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));
    }
}
