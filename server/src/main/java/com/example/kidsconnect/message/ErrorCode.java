package com.example.kidsconnect.message;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public enum ErrorCode {

    REQUIRED_USER_EMAIL("required.user.email"),
    REQUIRED_USER_PASSWORD("required.user.password"),
    NOT_FOUND_USER("notFound.user"),
    ERROR_USER_LOGIN("error.user.login"),
    ERROR_DB_REGISTRATION("error.db.registration"),
    INVALID("invaild");


    private String value;

    ErrorCode(String value){
        this.value=value;
    }

}
