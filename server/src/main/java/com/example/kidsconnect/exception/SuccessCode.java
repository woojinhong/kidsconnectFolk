package com.example.kidsconnect.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    OK(HttpStatus.OK, "OK", "성공적으로 처리되었습니다."),
    CREATED(HttpStatus.CREATED, "CREATED", "성공적으로 생성되었습니다."),
    NO_CONTENT(HttpStatus.NO_CONTENT, "NO_CONTENT", "내용이 없습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
