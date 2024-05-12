package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;
// String phoneNum, String postalCode, String addressDetail, String address, Boolean status, java.time.LocalDateTime inDate, LocalDateTime upDate)
    @Test
    void testi() {
        userRepository.findAll();

    }
    @Test
    void findByEmailAndPasswordTest() {
        User user = userRepository.findByEmailAndPassword("orolzleim2@gmail.com", "1234");

        assertNotNull(user);// 사용자 목록이 null이 아닌지 확인
        //assertEquals("orolzleim2@gmail.com", user.getEmail());

        System.out.println(user);


    }

    @BeforeEach
    void setUp() {
        for(int i = 0;i<=100;i++){

            User user = new User("orolzleim"+i+"@gmail.com","woojin"+i,"hong","1234",new Date(),"010-0000-0000","12345","김안리","김파구",true, LocalDateTime.now(),LocalDateTime.now());
            userRepository.save(user);
        }
    }
}