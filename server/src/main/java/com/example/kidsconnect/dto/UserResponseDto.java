package com.example.kidsconnect.dto;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class UserResponseDto {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private Date dateOfBirth;
    private String postalCode;
    private String addressDetail;
    private String address;
}
