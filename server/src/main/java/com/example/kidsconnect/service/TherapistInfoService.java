package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ToEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class TherapistInfoService {
    private final TherapistInfoRepository therapistInfoRepository;
    private final SymptomRepository symptomRepository;
    //therpaist_id 외래키 추후에 token으로 대체 예정
    private final TherapistRepository therapistRepository;
    private final TherapistExperienceRepository therapistExperienceRepository;
    private final ToEntity toEntity;
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public ResponseEntity<?> addTherapistInfo(TherapistInfoDto therapistInfoDto) {
        TherapistInfo therapistInfo = toEntity.toTherapistInfo(therapistInfoDto); // dto -> entity + jwt token

        addExperiences(therapistInfo, therapistInfoDto.getExperience());
        addEducations(therapistInfo, therapistInfoDto.getEducation());
        addSymptoms(therapistInfo, therapistInfoDto.getSymptom());

        // Therapist 엔티티를 설정  추후에 token으로 therapist_id 외래키 대체
        Therapist therapist = therapistRepository.findById(4L).orElseThrow(() -> new RuntimeException("Therapist가 존재하지 않습니다."));
        therapistInfo.setTherapist(therapist);


        // therapistInfo를 임시로 저장하여 ID를 생성
        therapistInfoRepository.save(therapistInfo);
        entityManager.flush(); // 데이터베이스에 즉시 반영하여 ID 생성

        // 생성된 ID를 사용하여 총 경력 계산 및 설정
        String totalExperience = calculateTotalExperience(therapistInfo.getId());
        therapistInfo.setTotalExperience(totalExperience);

        // 업데이트된 therapistInfo를 다시 저장
        entityManager.merge(therapistInfo);


        therapistInfoRepository.save(therapistInfo);

        return ResponseEntity.ok("치료사 포트폴리오 작성 성공");
    }


    @Transactional
    public ResponseEntity<?> updateTherapistInfo(Long id, TherapistInfoDto therapistInfoDto) {
        TherapistInfo existingTherapistInfo = therapistInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        // Clear and add new experiences
        existingTherapistInfo.getExperience().clear();
        addExperiences(existingTherapistInfo, therapistInfoDto.getExperience());

        // Clear and add new educations
        existingTherapistInfo.getEducation().clear();
        addEducations(existingTherapistInfo, therapistInfoDto.getEducation());

        // Clear and add new symptoms
        existingTherapistInfo.getTherapistInfoSymptom().clear();
        addSymptoms(existingTherapistInfo, therapistInfoDto.getSymptom());

        existingTherapistInfo.updateTherapistInfo(therapistInfoDto.getTitle(),
                therapistInfoDto.getBio(),
                therapistInfoDto.getContent(),
                therapistInfoDto.getIdentityCheck(),
                therapistInfoDto.getCrimeCheck(),
                therapistInfoDto.getCertificate(),
                therapistInfoDto.getAgeRange(),
                therapistInfoDto.getImageFile());

        // 총 경력 계산 및 설정
        String totalExperience = calculateTotalExperience(existingTherapistInfo.getId());
        existingTherapistInfo.setTotalExperience(totalExperience);

        therapistInfoRepository.save(existingTherapistInfo);

        return ResponseEntity.ok("수정 성공");
    }


    public ResponseEntity<?> deleteTherapistInfo(Long id) {
        if (!therapistInfoRepository.existsById(id)) {
            throw new CustomException(CustomCode.NOT_FOUND_MEMBER);
        }
        therapistInfoRepository.deleteById(id);
        return ResponseEntity.ok("삭제 성공");
    }

//    private void addTherapistInfo(Therapist therapist, List<TherapistInfo> therapistInfo) {
//        if (therapistInfo != null) {
//            therapistInfo.forEach(therapist::addTherapistInfo);
//        }
//    }

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

    //총경력 계산 메서드
    public String calculateTotalExperience(Long therapistInfoId) {
        String totalExperience = therapistExperienceRepository.getTotalExperience(therapistInfoId);
        return totalExperience != null ? totalExperience : "무경력";
    }


    @Transactional(readOnly = true)
    public ResponseEntity<?> showTherapistInfo(Long id) {
        TherapistInfo therapistInfo = therapistInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        TherapistInfoDto therapistInfoDto = TherapistInfoDto.builder()
                .title(therapistInfo.getTitle())
                .bio(therapistInfo.getBio())
                .content(therapistInfo.getContent())
                .identityCheck(therapistInfo.getIdentityCheck())
                .crimeCheck(therapistInfo.getCrimeCheck())
                .imageFile(therapistInfo.getImageFile())
                .viewCnt(therapistInfo.getViewCnt())
                .certificate(therapistInfo.getCertificate())
                .ageRange(therapistInfo.getAgeRange())
                .symptom(therapistInfo.getTherapistInfoSymptom().stream()
                        .map(TherapistInfoSymptom::getSymptom)
                        .collect(Collectors.toList()))
                .experience(therapistInfo.getExperience())
                .education(therapistInfo.getEducation())
                .build();

        return ResponseEntity.ok(therapistInfoDto);
    }


    //치료사 상세정보 id 값으로 조회
    @Transactional(readOnly = true)
    public TherapistInfo findById(Long id) {
        return therapistInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_THERAPIST_INFO));
    }
}
