package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Symptom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symptom;

    @OneToMany(mappedBy = "symptom", cascade = CascadeType.ALL)
    private List<ChildSymptom> childSymptom;

    @OneToMany(mappedBy = "symptom", cascade = CascadeType.ALL)
    private List<TherapistInfoSymptom> therapistInfoSymptom;
}
