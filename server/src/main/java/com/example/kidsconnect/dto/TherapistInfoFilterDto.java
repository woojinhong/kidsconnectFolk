package com.example.kidsconnect.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TherapistInfoFilterDto {
    private String address;
    private Boolean isExperience;
    private Character gender;
    private List<String> symptoms;
    private String sort;
}