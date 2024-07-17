package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class TherapistInfoSymptom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "therapist_info_id")
    private TherapistInfo therapistInfo;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "symptom_id")
    private Symptom symptom;


    public TherapistInfoSymptom(Symptom symptom) {
        this.symptom = symptom;
    }


}
//    public void addTherapistInfo(TherapistInfo therapistInfo) {
//        this.therapistInfo = therapistInfo;
//    }
//
//    public void addSymptom(Symptom symptom) {
//        this.symptom = symptom;
//    }

