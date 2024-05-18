package com.example.kidsconnect.dto;

import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.mapping.TherapistMapper;
import lombok.*;
import org.mapstruct.factory.Mappers;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TherapistSignUpDto {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;
    private Character gender;
    private boolean freelancer;
    private boolean status;

    private String centerName;

    }


