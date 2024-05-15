package com.example.kidsconnect.message;

import lombok.Getter;

@Getter
public enum SuccessCode {
    CREATED_USER("created.user"),
    CHANGED_PASSWORD("changed.password"),
    SUCCESS_USER_LOGIN("success.user.login"),
    CREATED_THERAPIST("created.therapist");

    private String value;

    SuccessCode(String value){
        this.value=value;
    }


}
