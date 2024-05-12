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
public class Enrol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean freelancer;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;
}
