package com.example.kidsconnect.dto;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Valid
public class UserDtoRequest {


    @NotBlank(message ="{required.user.email}")
    private String email;

    @NotBlank(message ="{required.user.password}")
    private String password;

}
