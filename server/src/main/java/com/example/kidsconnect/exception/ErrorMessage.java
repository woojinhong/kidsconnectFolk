package com.example.kidsconnect.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
@AllArgsConstructor
public class ErrorMessage {

    private String code;
    private String message;
}