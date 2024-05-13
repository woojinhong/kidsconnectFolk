package com.example.kidsconnect.dao;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ErrorCodeRepositoryTest {
    @Autowired
    ErrorCodeRepository errorCodeRepository;

    @Test
    @DisplayName("에러 코드 테스트 ")
    void findByCode() {

    }
}