package com.example.kidsconnect.service;

import com.example.kidsconnect.domain.Role;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.mapping.TherapistMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TherapistServiceTest {

    private static TherapistMapper therapistMapper;

    @BeforeAll
    public static void setUp() {
        therapistMapper = Mappers.getMapper(TherapistMapper.class);
    }

    @Test
    public void testMapStructPerformance() {
        long startTime = System.nanoTime();

        for (int i = 0; i < 50000; i++) {
            TherapistSignUpDto dto = new TherapistSignUpDto();
            dto.setEmail("therapist" + i + "@example.com");
            dto.setPassword("password" + i);
            dto.setFirstName("First" + i);
            dto.setLastName("Last" + i);
            dto.setPhoneNum("123-456-789" + i);
            dto.setPostalCode("Postal" + i);
            dto.setAddressDetail("Address Detail" + i);
            dto.setAddress("Address" + i);
            dto.setDateOfBirth(new Date());
            dto.setGender('M');
            dto.setFreelancer(false);
            dto.setStatus(true);
            dto.setCenterName("Center" + i);

            Therapist therapist = therapistMapper.fromTherapistSignUpDto(dto);

            // Additional operations
            therapist.setPassword("encodedPassword" + i);
            therapist.setRole(Role.ROLE_THERAPIST);
            therapist.setStatus(true);

            // Save to repository (mock or actual save)
            // therapistRepository.save(therapist);
        }

        long endTime = System.nanoTime();
        System.out.println("MapStruct Performance: " + (endTime - startTime) / 1_000_000 + " ms");
    }

    @Test
    public void testBuilderPerformance() {
        long startTime = System.nanoTime();

        for (int i = 0; i < 50000; i++) {
            TherapistSignUpDto dto = new TherapistSignUpDto();
            dto.setEmail("therapist" + i + "@example.com");
            dto.setPassword("password" + i);
            dto.setFirstName("First" + i);
            dto.setLastName("Last" + i);
            dto.setPhoneNum("123-456-789" + i);
            dto.setPostalCode("Postal" + i);
            dto.setAddressDetail("Address Detail" + i);
            dto.setAddress("Address" + i);
            dto.setDateOfBirth(new Date());
            dto.setGender('M');
            dto.setFreelancer(false);
            dto.setStatus(true);
            dto.setCenterName("Center" + i);

            Therapist therapist = Therapist.builder()
                    .email(dto.getEmail())
                    .password(dto.getPassword())
                    .firstName(dto.getFirstName())
                    .lastName(dto.getLastName())
                    .phoneNum(dto.getPhoneNum())
                    .postalCode(dto.getPostalCode())
                    .addressDetail(dto.getAddressDetail())
                    .address(dto.getAddress())
                    .dateOfBirth(dto.getDateOfBirth())
                    .gender(dto.getGender())
                    .freelancer(dto.isFreelancer())
                    .status(dto.isStatus())
                    .role(Role.ROLE_THERAPIST)
                    .build();

            // Additional operations
            therapist.setPassword("encodedPassword" + i);
            therapist.setRole(Role.ROLE_THERAPIST);
            therapist.setStatus(true);

            // Save to repository (mock or actual save)
            // therapistRepository.save(therapist);
        }

        long endTime = System.nanoTime();
        System.out.println("Builder Performance: " + (endTime - startTime) / 1_000_000 + " ms");
    }
}