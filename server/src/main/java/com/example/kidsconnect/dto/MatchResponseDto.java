package com.example.kidsconnect.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

//치료사 간략정보 리스트
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchResponseDto {
    private String therapistName;
    private String bio;
    private byte[] imageFile;
    private String totalExperience;
    private String centerName;
    private List<String> symptoms;

//    public MatchResponseDto(String therapistName, String bio, byte[] imageFile, String totalExperience, String centerName) {
//        this.therapistName = therapistName;
//        this.bio = bio;
//        this.imageFile = imageFile;
//        this.totalExperience = totalExperience;
//        this.centerName = centerName;
//    }

    @JsonProperty("imageFile")
    public String getImageFileBase64() {
        return imageFile != null ? Base64.getEncoder().encodeToString(imageFile) : null;
    }

}
