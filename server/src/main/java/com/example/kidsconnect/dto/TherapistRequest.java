package com.example.kidsconnect.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TherapistRequest {

    @NotBlank
    private String email;
    @NotBlank
    private String pwd;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String phoneNum;
    @NotBlank
    private String postalCode;
    @NotBlank
    private String address;
    private String addressDetail;



}
