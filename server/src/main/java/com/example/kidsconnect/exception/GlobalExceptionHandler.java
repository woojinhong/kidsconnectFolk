package com.example.kidsconnect.exception;

import com.example.kidsconnect.dto.Response;
import com.example.kidsconnect.exception.UserNotFoundException;
import com.example.kidsconnect.message.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.example.kidsconnect.message.ErrorCode;
@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    MessageSourceAccessor msg;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Internal server error: " + ex.getMessage());
    }

/*
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
*/

    // 다른 예외 처리 메서드들을 추가할 수 있음

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Response> UserNotFoundException(UserNotFoundException ex){

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(makeErrorResponse(ErrorCode.NOT_FOUND_USER));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response> IllegalArgumentException(IllegalArgumentException ex){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(makeErrorResponse(ErrorCode.INVALID,ex.getMessage()));
    }



    public Response makeErrorResponse(ErrorCode errorCode){

        String code = errorCode.name();
        String message = msg.getMessage(errorCode.getValue());

        return Response.builder()
                .code(code)
                .message(message)
                .build();
    }

    public Response makeErrorResponse(ErrorCode errorCode, String detailMessage){

        String code = errorCode.name();
        String message = msg.getMessage(errorCode.getValue());

        return Response.builder()
                .code(code)
                .message(message)
                .detail(detailMessage)
                .build();
    }



/*    @ExceptionHandler(UserNotFoundException.class)
    public <T> ResponseEntity<Response> UserNotFoundException(ErrorCode errorCode, T detail){
        String code = errorCode.name();
        String message = msg.getMessage(errorCode.getValue());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Response.builder()
                    .code(code)
                    .message(message)
                    .detail(detail)
                    .build());
    }*/


}