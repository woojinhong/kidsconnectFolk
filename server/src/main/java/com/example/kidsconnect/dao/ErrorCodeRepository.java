package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.ErrorCode;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrorCodeRepository extends JpaRepository<ErrorCode, String> {

    ErrorCode findByCode(String code);
}
