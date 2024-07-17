package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.Center;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.mapping.TherapistMapper;
import com.example.kidsconnect.mapping.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TherapistRepositoryTest {
    @Autowired
    TherapistRepository therapistRepository;
    @Autowired
    CenterRepository centerRepository;
    private final TherapistMapper therapistMapper = Mappers.getMapper(TherapistMapper.class);



    @Test
    @DisplayName("치료사 회원가입")
    public void therapistRegister(){
        Therapist therapistTest=null;
        for (int i = 0; i < 10; i++) {
            Therapist therapist = Therapist.builder()
                    .address("동파리구")
                    .addressDetail("동파육수")
                    .email("orolzleim@gmail.com")
                    .password("")
                    .firstName("아무개")
                    .lastName("김")
                    .gender('F')
                    .freelancer(false)
                    .phoneNum("010-0000-0000")
                    .status(false)
                    .inDate(LocalDateTime.now())
                    .upDate(LocalDateTime.now())
                    .postalCode("12345")
                    .dateOfBirth(new Date())
                    .build();
           therapistTest =therapistRepository.save(therapist);
        }

        System.out.println("therapistTest = " + therapistTest);

        TherapistSignUpDto therapistSignUpDto =therapistMapper.toTherapistSignUpDto(therapistTest);
        System.out.println("therapistSignUpDto = " + therapistSignUpDto);
        assertEquals(therapistSignUpDto.getEmail(),"orolzleim@gmail.com");


    }
    @BeforeEach
    void setUp() {
        for (int i = 1; i <= 10; i++) {
            Center center = Center.builder()
                    .address("동파구 동작")
                    .centerNum("032-353-5322")
                    .name("해오름센터"+i)
                    .inDate(LocalDateTime.now())
                    .upDate(LocalDateTime.now())
                    .phoneNum("010-0101-1111")
                    .addressDetail("해오름구 177번")
                    .postalCode("1234")
                    .build();

            centerRepository.save(center);
        }
    }
}