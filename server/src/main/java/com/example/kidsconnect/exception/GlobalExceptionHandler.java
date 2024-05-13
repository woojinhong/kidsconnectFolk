package com.example.kidsconnect.exception;





import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException customException) {
        return ResponseEntity
                .status(customException.getCustomCode().getHttpStatus())
                .body(new ErrorMessage(
                        customException.getCustomCode().getCode(),
                        customException.getCustomCode().getMessage()
                ));
    }

}