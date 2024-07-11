package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ChildRepository;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.ChildRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ChildServiceTest {

    @Autowired
    private ChildService childService;

    @Autowired
    private ChildRepository childRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveChild() {
//        // Given
//        User user = User.builder()
//                .email("parent@example.com")
//                .firstName("ParentFirstName")
//                .lastName("ParentLastName")
//                .password("password")
//                .phoneNum("123-456-7890")
//                .postalCode("12345")
//                .addressDetail("Address Detail")
//                .address("New York")
//                .dateOfBirth(new Date())
//                .status(true)
//                .inDate(LocalDateTime.now())
//                .upDate(LocalDateTime.now())
//                .build();
//        user = userRepository.save(user);

//        Child child = Child.builder()
//                .firstName("ChildFirstName")
//                .lastName("ChildLastName")
//                .dateOfBirth(new Date())
//                .gender('M')
//                .personality(Arrays.asList("outgoing", "curious"))
//                .inDate(LocalDateTime.now())
//                .upDate(LocalDateTime.now())
//                .build();
//
//        // When
//        Child savedChild = childRepository.save(child);
//
//        // Then
//        assertNotNull(savedChild.getId());
//        assertEquals("ChildFirstName", savedChild.getFirstName());
//        assertEquals("ChildLastName", savedChild.getLastName());
//        assertEquals('M', savedChild.getGender());
//        assertEquals(2, savedChild.getPersonality().size());
//        assertTrue(savedChild.getPersonality().contains("outgoing"));
//        assertTrue(savedChild.getPersonality().contains("curious"));
//
    }
}