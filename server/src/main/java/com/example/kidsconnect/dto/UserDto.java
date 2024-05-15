package com.example.kidsconnect.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;


    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @ToString
    public class UserDto {


        @NotBlank(message ="{required.user.email}")
        private String email;

        @NotBlank(message ="{required.user.password}")
        private String password;

        private Boolean status;

    }
