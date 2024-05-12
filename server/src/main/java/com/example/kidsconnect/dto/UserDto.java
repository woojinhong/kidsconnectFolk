package com.example.kidsconnect.dto;


import lombok.*;


    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @ToString
    public class UserDto {
        private String email;

        private String password;

        private Boolean status;

    }
