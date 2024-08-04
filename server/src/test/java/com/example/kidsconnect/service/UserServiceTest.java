package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.mapping.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @Transactional
    public void testSignUp() {
        List<UserSignUpDto> userSignUpDtos = generateTestUsers(1000);

        for (UserSignUpDto userSignUpDto : userSignUpDtos) {
            // Mock userMapper to return a valid User object
            User user = User.builder()
                    .email(userSignUpDto.getEmail())
                    .firstName(userSignUpDto.getFirstName())
                    .lastName(userSignUpDto.getLastName())
                    .password(userSignUpDto.getPassword())
                    .address(userSignUpDto.getAddress())
                    .addressDetail(userSignUpDto.getAddressDetail())
                    .postalCode(userSignUpDto.getPostalCode())
                    .dateOfBirth(userSignUpDto.getDateOfBirth())
                    .status(true)
                    .phoneNum(userSignUpDto.getPhoneNum())
                    .build();


            ResponseEntity<String> response = userService.signUp(userSignUpDto);

            assertEquals("부모 회원가입 성공", response.getBody());
            verify(userRepository, times(1)).save(user);

            assertEquals(passwordEncoder.encode(userSignUpDto.getPassword()), user.getPassword());
        }

        verify(userRepository, times(1000)).save(any(User.class));
    }

    private List<UserSignUpDto> generateTestUsers(int count) {
        List<UserSignUpDto> userSignUpDtos = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < count; i++) {
            UserSignUpDto userSignUpDto = new UserSignUpDto();
            userSignUpDto.setEmail("test" + i + "@example.com");
            userSignUpDto.setPassword("password" + i);
            userSignUpDto.setFirstName("First" + i);
            userSignUpDto.setLastName("Last" + i);
            userSignUpDto.setPhoneNum("010-1234-" + String.format("%04d", random.nextInt(10000)));
            userSignUpDto.setDateOfBirth(new Date());
            userSignUpDto.setPostalCode("12345");
            userSignUpDto.setAddress("Address" + i);
            userSignUpDto.setAddressDetail("AddressDetail" + i);
            userSignUpDtos.add(userSignUpDto);
        }

        return userSignUpDtos;
    }
}