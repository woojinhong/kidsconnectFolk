package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.TherapistInfoMapper;
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

    private final SymptomService symptomService;
    private final TherapistService therapistService;
    private final TherapistExperienceRepository therapistExperienceRepository;
    private final TherapistInfoMapper therapistInfoMapper;
    @PersistenceContext
    private EntityManager entityManager;


    @Transactional(readOnly = true)
    public ResponseEntity<?> showTherapistInfo(UserPrinciple userDetails) {

        TherapistInfo therapistInfo = findByTherapistId(userDetails.getId());

        // 인증된 사용자(therapist)가 이 TherapistInfo의 소유자인지 확인
        verifyTherapistOwnership(therapistInfo, userDetails);

        TherapistInfoDto therapistInfoDto = therapistInfoMapper.toTherapistInfoDto(therapistInfo);

        return ResponseEntity.ok(therapistInfoDto);
    }

    @Transactional
    public ResponseEntity<?> addTherapistInfo(TherapistInfoDto therapistInfoDto, UserPrinciple userDetails) {


        TherapistInfo therapistInfo = therapistInfoMapper.toTherapistInfo(therapistInfoDto); // dto -> entity + jwt token


        // Therapist 엔티티 객체 반환
        Therapist therapist = therapistService.findById(userDetails.getId());

        // therapistInfo에 therapist 객체 저장
        therapistInfo.setTherapist(therapist);

        // 인증된 사용자(therapist)가 이 TherapistInfo의 소유자인지 확인
        verifyTherapistOwnership(therapistInfo, userDetails);

        addExperiences(therapistInfo, therapistInfoDto.getExperience());
        addEducations(therapistInfo, therapistInfoDto.getEducation());
        addSymptoms(therapistInfo, therapistInfoDto.getSymptom());


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
    public ResponseEntity<?> updateTherapistInfo(TherapistInfoDto therapistInfoDto, UserPrinciple userDetails) {
        TherapistInfo existingTherapistInfo = findByTherapistId(userDetails.getId());


        // 인증된 사용자(therapist)가 이 TherapistInfo의 소유자인지 확인
        verifyTherapistOwnership(existingTherapistInfo, userDetails);

        // Clear and add new experiences
        existingTherapistInfo.getExperience().clear();
        addExperiences(existingTherapistInfo, therapistInfoDto.getExperience());

        // Clear and add new educations
        existingTherapistInfo.getEducation().clear();
        addEducations(existingTherapistInfo, therapistInfoDto.getEducation());

        // Clear and add new symptoms
        existingTherapistInfo.getTherapistInfoSymptom().clear();
        addSymptoms(existingTherapistInfo, therapistInfoDto.getSymptom());

        //수정
        therapistInfoMapper.updateEntityFromDto(therapistInfoDto, existingTherapistInfo);
        // 총 경력 계산 및 설정
        String totalExperience = calculateTotalExperience(existingTherapistInfo.getId());
        existingTherapistInfo.setTotalExperience(totalExperience);

        therapistInfoRepository.save(existingTherapistInfo);

        return ResponseEntity.ok("치료사 상세정보 수정 성공");
    }

    @Transactional
    public ResponseEntity<?> deleteTherapistInfo(UserPrinciple userDetails) {
        TherapistInfo therapistInfo = findByTherapistId(userDetails.getId());

        // 인증된 사용자(therapist)가 이 TherapistInfo의 소유자인지 확인
        verifyTherapistOwnership(therapistInfo, userDetails);

        therapistInfoRepository.deleteById(therapistInfo.getId());
        return ResponseEntity.ok("치료사 상세정보 삭제 성공");
    }


    /**
     * 치료사 경험 정보를 치료사 엔티티에 추가하는 메서드
     *
     * @param therapistInfo 치료사 엔티티
     * @param experiences   치료사 경험 정보 리스트
     */
    private void addExperiences(TherapistInfo therapistInfo, List<TherapistExperience> experiences) {
        if (experiences != null) {
            experiences.forEach(therapistInfo::addTherapistExperience);
        }
    }

    /**
     * 치료사 교육 정보를 치료사 엔티티에 추가하는 메서드
     *
     * @param therapistInfo 치료사 엔티티
     * @param educations    치료사 교육 정보 리스트
     */
    private void addEducations(TherapistInfo therapistInfo, List<TherapistEducation> educations) {
        if (educations != null) {
            educations.forEach(therapistInfo::addTherapistEducation);
        }
    }

    /**
     * 치료사 증상 정보를 치료사 엔티티에 추가하는 메서드
     *
     * @param therapistInfo 치료사 엔티티
     * @param symptoms      치료사 증상 정보 리스트
     */
    private void addSymptoms(TherapistInfo therapistInfo, List<String> symptoms) {
        if (symptoms != null) {
            for (String symptomName : symptoms) {
                Symptom symptom = symptomService.findByName(symptomName);
                TherapistInfoSymptom therapistInfoSymptom = new TherapistInfoSymptom(symptom);
                therapistInfo.addTherapistInfoSymptom(therapistInfoSymptom);
            }
        }
    }


    //총경력 계산 메서드
    public String calculateTotalExperience(Long therapistInfoId) {
        String totalExperience = therapistExperienceRepository.getTotalExperience(therapistInfoId);
        return totalExperience != null ? totalExperience : "무경력";
    }


    private void verifyTherapistOwnership(TherapistInfo therapistInfo, UserPrinciple userDetails) {
        if (therapistInfo.getTherapist() == null || !therapistInfo.getTherapist().getId().equals(userDetails.getId())) {
            throw new CustomException(CustomCode.NOT_VALID_OWNER);
        }
    }


    //치료사 상세정보 id 값으로 조회
    @Transactional(readOnly = true)
    public TherapistInfo findById(Long id) {
        return therapistInfoRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_THERAPIST_INFO));
    }


    @Transactional(readOnly = true)
    public TherapistInfo findByTherapistId(Long therapistId) {
        return therapistInfoRepository.findByTherapistId(therapistId)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_THERAPIST_INFO));
    }
}
