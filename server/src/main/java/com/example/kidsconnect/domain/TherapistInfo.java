package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TherapistInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String bio;
    private String content;
    private String education;
    private Boolean identityCheck;
    private Boolean crimeCheck;
    private String ageRange;
    @Lob
    private byte[] imageFile;
    private int viewCnt;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;


    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    @OneToMany(mappedBy = "therapistInfo", cascade = CascadeType.ALL)
    private List<TherapistInfoSymptom> therapistInfoSymptom;
}
