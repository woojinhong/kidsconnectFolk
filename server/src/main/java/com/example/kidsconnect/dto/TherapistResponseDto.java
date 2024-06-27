package com.example.kidsconnect.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class TherapistResponseDto {

    private String email;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;
    private Character gender;
    private boolean freelancer;
    private boolean status;

    private List<String> centerName;
}
