package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ToEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TherapistInfoService {
    private final TherapistInfoRepository therapistInfoRepository;
    private final SymptomRepository symptomRepository;
    private final ToEntity toEntity;
    @Transactional
    public ResponseEntity<?> addTherapistInfo(TherapistInfoDto therapistInfoDto) {
        TherapistInfo therapistInfo = toEntity.toTherapistInfo(therapistInfoDto); // dto -> entity

        addExperiences(therapistInfo, therapistInfoDto.getExperience());
        addEducations(therapistInfo, therapistInfoDto.getEducation());
        addSymptoms(therapistInfo, therapistInfoDto.getSymptom());

        therapistInfoRepository.save(therapistInfo);

        return ResponseEntity.ok("치료사 포트폴리오 작성 성공");
    }


    public ResponseEntity<?> updateTherapistInfo(TherapistInfoDto therapistInfoDto) {
        TherapistInfo therapistInfo = toEntity.toTherapistInfo(therapistInfoDto);



        return ResponseEntity.ok("수정 성공");
    }







    /**
     * 치료사 경험 정보를 치료사 엔티티에 추가하는 메서드
     * @param therapistInfo 치료사 엔티티
     * @param experiences 치료사 경험 정보 리스트
     */
    private void addExperiences(TherapistInfo therapistInfo, List<TherapistExperience> experiences) {
        if (experiences != null) {
            experiences.forEach(therapistInfo::addTherapistExperience);
        }
    }

    /**
     * 치료사 교육 정보를 치료사 엔티티에 추가하는 메서드
     * @param therapistInfo 치료사 엔티티
     * @param educations 치료사 교육 정보 리스트
     */
    private void addEducations(TherapistInfo therapistInfo, List<TherapistEducation> educations) {
        if (educations != null) {
            educations.forEach(therapistInfo::addTherapistEducation);
        }
    }

    /**
     * 치료사 증상 정보를 치료사 엔티티에 추가하는 메서드
     * @param therapistInfo 치료사 엔티티
     * @param symptoms 치료사 증상 정보 리스트
     */
    private void addSymptoms(TherapistInfo therapistInfo, List<Symptom> symptoms) {
        if (symptoms != null) {
            symptoms.forEach(symptom -> {
                Symptom symptomMatch = symptomRepository.findByName(symptom.getName())
                        .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_SYMPTOM));
                TherapistInfoSymptom therapistInfoSymptom = new TherapistInfoSymptom(symptomMatch);
                therapistInfo.addTherapistInfoSymptom(therapistInfoSymptom);
            });
        }
    }
}
