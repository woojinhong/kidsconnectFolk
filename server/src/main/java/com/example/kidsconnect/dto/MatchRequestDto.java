package com.example.kidsconnect.dto;

import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.domain.TherapistExperience;
import lombok.*;

import java.util.List;
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchRequestDto {
    private Boolean isExperience;
    private Character gender;
    private List<String> symptoms;


}
