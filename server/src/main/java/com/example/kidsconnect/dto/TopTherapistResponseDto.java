package com.example.kidsconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopTherapistResponseDto {
    private String therapistName;
    private String bio;
    private byte[] imageFile;
    private String totalExperience;
    private String centerName;
    private List<String> symptoms;
    private double avgRating;
}