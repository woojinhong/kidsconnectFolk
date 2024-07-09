package com.example.kidsconnect.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;
@Data
@ToString
@Builder
public class SurveyDto {
    private String childName;
    private String childDob;
    private String childPersonality;
    private List<Long> childSymptom;


}
