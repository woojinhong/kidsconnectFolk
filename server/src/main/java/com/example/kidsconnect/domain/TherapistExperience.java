package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TherapistExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String place;
    private Date startDate;
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;
}
