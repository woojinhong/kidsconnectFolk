package com.example.kidsconnect.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ErrorCode {

    @Id
    private String code;
    private int status;
    private String message;

    // 생성자, getter, setter 등 필요한 메서드 추가
}