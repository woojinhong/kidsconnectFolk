package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    //객체 매핑 정보 (mapstruct)
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    @Test
    void testi() {
        userRepository.findAll();

    }
    @Test
    @DisplayName("로그인 테스트")
    void findByEmailAndPasswordTest() {
        // 이메일과 비밀번호를 사용하여 사용자를 검색
        Optional<User> optionalUser = userRepository.findByEmailAndPassword("orolzleim2@gmail.com", "1234");

        // Optional이 null이 아닌지 확인
        assertNotNull(optionalUser);

        // Optional에서 사용자를 가져옴
        User user = optionalUser.orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        // 필요한 추가 검증 수행
        System.out.println(user);
    }

    @Test
    @DisplayName("회원가입 테스트")
    void registerTest(){
        //이메일 중복 테스트
        boolean Emailtest = userRepository.existsByEmail("orolzleim2@gmail.com");
        assertTrue(Emailtest==true);

        //
        User user = User.builder()
                .email("dnwls753951@gmail.com")
                .firstName("woojin")
                .lastName("hong")
                .password("1234")
                .address("송파구")
                .addressDetail("우성아파트 123호")
                .postalCode("12345")
                .dateOfBirth(new Date())
                .status(true)
                .phoneNum("010-3333-3333")
                .inDate(LocalDateTime.now())
                .upDate(LocalDateTime.now())
                .build();
        userRepository.save(user);

        User user2 = userRepository.findByEmail("dnwls753951@gmail.com");

        //entity 객체 getter setter 없음
        //방법1(객체매핑) 민수님 mapstruct dto builder()로 객체생성 대신입니다.
        //user2 entity 객채 -> UserSignUpDto 객체매핑
        UserSignUpDto userSignUpDto = userMapper.toUserSignUpDto(user2);
        assertTrue( userSignUpDto.getEmail().equals("dnwls753951@gmail.com"));


    }

    @BeforeEach
    void setUp() {
        for(int i = 0;i<=100;i++){
            User user = User.builder()
                    .email("orolzleim"+i+"@gmail.com")
                    .firstName("woojin"+i)
                    .lastName("hong")
                    .password("1234")
                    .address("송파구")
                    .addressDetail("우성아파트 123호")
                    .postalCode("12345")
                    .dateOfBirth(new Date())
                    .status(true)
                    .phoneNum("010-3333-3333")
                    .inDate(LocalDateTime.now())
                    .upDate(LocalDateTime.now())
                    .build();

            userRepository.save(user);
        }
    }
}