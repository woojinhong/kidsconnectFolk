package com.example.kidsconnect.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.Date;

@Data
public class UserSignUpDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;
}
