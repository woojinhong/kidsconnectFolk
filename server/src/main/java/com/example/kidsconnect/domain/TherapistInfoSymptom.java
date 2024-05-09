package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TherapistInfoSymptom {

    @Id
    @ManyToOne
    @JoinColumn(name = "therapist_info_id")
    private TherapistInfo therapistInfo;

    @Id
    @ManyToOne
    @JoinColumn(name = "symptom_id")
    private Symptom symptom;

}
