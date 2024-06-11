package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.example.kidsconnect.service.MatchService;
import com.example.kidsconnect.service.TherapistInfoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class TherapistInfoRepositoryTest {
    @MockBean
    TherapistInfoRepository therapistInfoRepository;
    @Autowired
    private TherapistInfoService therapistInfoService;
    @Autowired
    private MatchService matchService;

    private List<MatchResponseDto> mockResponses;

    @Test
    @DisplayName("therapistInfo Experience 테스트")
    void saveTherapistInfoWithExperience() {
        TherapistInfo therapistInfo = TherapistInfo.builder()
                .title("김수땡 심리 전문 치료 포트폴리오")
                .ageRange(Arrays.asList("0~3세", "10~13세"))
                .build();

    }
    @Test
    @DisplayName("Fetch Join 테스트 ")
    void findTherapistInfoFetchJoin() {
        List<TherapistInfo> list = therapistInfoRepository.findTherapistInfoWithExperiences(1l);


    }

    @Test
    @DisplayName("EntityGraph 테스트 ")
    void findTherapistInfoEntityGraph() {
        List<TherapistInfo> list = therapistInfoRepository.findAllById(1L);

        list.forEach(therapistInfo -> {
            System.out.println("Name: " + therapistInfo.getExperience());
            System.out.println("Title: " + therapistInfo.getTitle());
            System.out.println("therapistInfo.getId() = " + therapistInfo.getId());

        });
    }

    @Test
    @DisplayName("therapistInfo 나이 range 저장 테스트")
    void saveTherapistInfoWithAgeRange(){
        TherapistInfo therapistInfo = TherapistInfo.builder()
                .title("김수땡 심리 전문 치료 포트폴리오")
                .ageRange(Arrays.asList("0~3세", "10~13세"))
                .build();

        // when
        TherapistInfo savedTherapistInfo = therapistInfoRepository.save(therapistInfo);

        // then
        assertNotNull(savedTherapistInfo.getId());
        assertEquals(therapistInfo.getTitle(), savedTherapistInfo.getTitle());
        assertEquals(therapistInfo.getAgeRange(), savedTherapistInfo.getAgeRange());

        System.out.println("savedTherapistInfo = " + savedTherapistInfo);
    }




    @BeforeEach
    void setUp() {
        // Mock 데이터 생성
        mockResponses = Arrays.asList(
                new MatchResponseDto("Therapist1", "Bio1", null, "5 years", "Center1", Arrays.asList("Symptom1", "Symptom2")),
                new MatchResponseDto("Therapist2", "Bio2", null, "3 years", "프리랜서", Arrays.asList("Symptom2", "Symptom3")),
                new MatchResponseDto("Therapist3", "Bio3", null, "4 years", "Center2", Arrays.asList("Symptom1")),
                new MatchResponseDto("Therapist4", "Bio4", null, "2 years", "Center3", Arrays.asList("Symptom3")),
                new MatchResponseDto("Therapist5", "Bio5", null, "6 years", "Center1", Arrays.asList("Symptom1", "Symptom3")),
                new MatchResponseDto("Therapist6", "Bio6", null, "1 year", "프리랜서", Arrays.asList("Symptom2")),
                new MatchResponseDto("Therapist7", "Bio7", null, "7 years", "Center4", Arrays.asList("Symptom1", "Symptom2", "Symptom3")),
                new MatchResponseDto("Therapist8", "Bio8", null, "8 years", "Center5", Arrays.asList("Symptom1", "Symptom2")),
                new MatchResponseDto("Therapist9", "Bio9", null, "3 years", "Center6", Arrays.asList("Symptom3")),
                new MatchResponseDto("Therapist10", "Bio10", null, "5 years", "프리랜서", Arrays.asList("Symptom1", "Symptom2"))
        );

        // therapistInfoRepository 모킹
        when(therapistInfoRepository.findTherapistsByCriteria(any(MatchRequestDto.class)))
                .thenReturn(mockResponses);
    }

    @Test
    @DisplayName("치료사 매칭 결과 테스트")
    void therapistMatchTest() {
        // MatchRequestDto 생성
        MatchRequestDto matchRequestDto = MatchRequestDto.builder()
                .gender(null)
                .isExperience(false)
                .symptoms(Arrays.asList("Symptom1"))
                .build();

        // 서비스 메서드 호출
        List<MatchResponseDto> result = matchService.findTherapistsByCriteria(matchRequestDto);

        // 검증
//        assertNotNull(result);
//        assertEquals(2, result.size());
//        assertEquals("Therapist1", result.get(0).getTherapistName());
//        assertEquals("Therapist2", result.get(1).getTherapistName());
//        assertEquals(Arrays.asList("Symptom1", "Symptom2"), result.get(0).getSymptoms());
//        assertEquals(Arrays.asList("Symptom2", "Symptom3"), result.get(1).getSymptoms());

        // 결과 출력
        result.forEach(System.out::println);
    }
}