package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ChildSymptom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;


    @ManyToOne
    @JoinColumn(name = "symptom_id")
    private Symptom symptom;

}
