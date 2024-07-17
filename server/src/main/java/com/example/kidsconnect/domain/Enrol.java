package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@DynamicInsert
public class Enrol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime inDate;
    private LocalDateTime upDate;


    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;


    @PrePersist
    protected void onCreate() {
        if (this.inDate == null) {
            this.inDate = LocalDateTime.now();
        }
        if (this.upDate == null) {
            this.upDate = LocalDateTime.now();
        }

    }

    @PreUpdate
    protected void onUpdate() {
        this.upDate = LocalDateTime.now();
    }


}
