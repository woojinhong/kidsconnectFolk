package com.example.kidsconnect.dto;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.domain.TherapistEducation;
import com.example.kidsconnect.domain.TherapistExperience;
import com.example.kidsconnect.domain.TherapistInfoSymptom;
import jakarta.persistence.*;
import lombok.*;


import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class TherapistInfoDto {

    private Long id;  //해당 치료사 포트폴리오 id 리뷰용
    private String title;
    private String bio;
    private String content;
    private Boolean identityCheck;
    private Boolean crimeCheck;
    @Lob
    private byte[] imageFile;
    private int viewCnt;

    private List<String> certificate;
    private List<String> ageRange;
    private List<String> symptom;
    private List<TherapistExperience> experience;

    private List<TherapistEducation> education;

}
