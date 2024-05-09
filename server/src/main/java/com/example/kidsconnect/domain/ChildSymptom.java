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
public class ChildSymptom {
    @Id
    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    @Id
    @ManyToOne
    @JoinColumn(name = "symptom_id")
    private Symptom symptom;

}
