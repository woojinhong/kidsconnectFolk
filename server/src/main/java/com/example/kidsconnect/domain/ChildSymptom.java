package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Child child;


    @ManyToOne
    @JoinColumn(name = "symptom_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Symptom symptom;

}
