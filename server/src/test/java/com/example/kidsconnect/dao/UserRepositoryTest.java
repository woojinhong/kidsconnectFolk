package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDateTime;
import java.util.Date;

import static java.time.LocalDate.now;

@SpringBootTest
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;
// String phoneNum, String postalCode, String addressDetail, String address, Boolean status, java.time.LocalDateTime inDate, LocalDateTime upDate)
    @Test
    void testi(){
       userRepository.findAll();

        }

    @BeforeEach
    void setUp() {
        for(int i = 0;i<=100;i++){

            User user = new User("woojin"+i,"hong","1234",new Date(),"010-0000-0000","12345","김안리","김파구",true, LocalDateTime.now(),LocalDateTime.now());

            userRepository.save(user);
        }
    }
}