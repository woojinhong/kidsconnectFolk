package com.example.kidsconnect.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

//치료사 간략정보 리스트
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchResponseDto {
    private Long therapistId;
    private String therapistName;
    private String bio;
    private byte[] imageFile;
    private String totalExperience;
    private String centerName;
    private List<String> symptoms;



}
