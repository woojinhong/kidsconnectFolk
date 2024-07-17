package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ChildRepository;
import com.example.kidsconnect.dao.ChildSymptomRepository;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ChildRequestDto;
import com.example.kidsconnect.dto.ChildResponseDto;
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
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChildService {

    private final ChildRepository childRepository;
    private final SymptomService symptomService;
    private final ChildSymptomRepository childSymptomRepository;

    private final ChildSymptomService childSymptomService;
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

    // child 삭제
    @Transactional
    public ResponseEntity<?> deleteChild(Long id) {
        // 아이 조회
        Child child = findById(id);
        // 아이 삭제
        childRepository.delete(child);

        return ResponseEntity.ok("아이 삭제 성공");
    }

    // child 업데이트
    @Transactional
    public ResponseEntity<?> updateChild(Long id, ChildRequestDto childRequestDto) {
        // 아이 조회
        Child child = findById(id);
        //
        childMapper.updateChildFromDto(childRequestDto, child);

        childRepository.save(child);

        // 기존 증상과 새로운 증상을 비교하여 변경이 필요한 경우에만 수정
        updateChildSymptoms(childRequestDto, child);

        return ResponseEntity.ok("아이 정보 업데이트 성공");
    }

    //부모 id로 child 조회
    @Transactional(readOnly = true)
    public List<ChildResponseDto> getChildrenByUserId(Long userId) {
        List<Child> children = childRepository.findByUserId(userId);
        if (children.isEmpty()) {
            throw new CustomException(CustomCode.NOT_FOUND_CHILD);
        }

        return children.stream()
                .map(child -> {
                    ChildResponseDto dto = childMapper.toChildResponseDto(child);
                    dto.setSymptomName(childSymptomService.findByChildId(child.getId()).stream()
                            .map(cs -> cs.getSymptom().getName())
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }



    // 기존 증상과 새로운 증상을 비교하여 변경이 필요한 경우에만 수정하는 메서드
    private void updateChildSymptoms(ChildRequestDto childRequestDto, Child child) {
        List<String> newSymptomNames = childRequestDto.getSymptomName();
        List<ChildSymptom> existingChildSymptoms = childSymptomRepository.findByChildId(child.getId());

        // 기존 증상에서 제거할 증상 찾기
        List<ChildSymptom> symptomsToDelete = existingChildSymptoms.stream()
                .filter(existingSymptom -> !newSymptomNames.contains(existingSymptom.getSymptom().getName()))
                .collect(Collectors.toList());

        // 새로운 증상 중 추가할 증상 찾기
        List<ChildSymptom> symptomsToAdd = newSymptomNames.stream()
                .filter(newSymptomName -> existingChildSymptoms.stream()
                        .noneMatch(existingSymptom -> existingSymptom.getSymptom().getName().equals(newSymptomName)))
                .map(newSymptomName -> {
                    Symptom symptom = symptomService.findByName(newSymptomName);
                    return ChildSymptom.builder()
                            .child(child)
                            .symptom(symptom)
                            .build();
                })
                .collect(Collectors.toList());

        // 기존 증상 삭제
        childSymptomRepository.deleteAll(symptomsToDelete);
        // 새로운 증상 추가
        childSymptomRepository.saveAll(symptomsToAdd);
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
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_CHILD));
    }
}
