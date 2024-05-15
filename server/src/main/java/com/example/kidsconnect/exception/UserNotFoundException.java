package com.example.kidsconnect.exception;

import com.example.kidsconnect.message.ErrorCode;

public class UserNotFoundException extends RuntimeException {

    private ErrorCode errorCode;

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(ErrorCode errorCode){
        this.errorCode =errorCode;
    }

    public UserNotFoundException() {

    }

}
