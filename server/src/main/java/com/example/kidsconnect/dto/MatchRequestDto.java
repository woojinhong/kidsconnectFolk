package com.example.kidsconnect.dto;

import lombok.*;

import java.util.List;
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchRequestDto {
    private String experience;
    private String speciality;
    private char gender;
    private String address;


}
