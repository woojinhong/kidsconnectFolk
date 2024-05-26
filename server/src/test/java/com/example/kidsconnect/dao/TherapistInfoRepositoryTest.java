package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.TherapistInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TherapistInfoRepositoryTest {
    @Autowired
    TherapistInfoRepository therapistInfoRepository;

    @Test
    @DisplayName("therapistInfo Experience 테스트")
    void saveTherapistInfoWithExperience() {
        TherapistInfo therapistInfo = TherapistInfo.builder()
                .title("김수땡 심리 전문 치료 포트폴리오")
                .ageRange(Arrays.asList("0~3세", "10~13세"))
                .build();

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


}