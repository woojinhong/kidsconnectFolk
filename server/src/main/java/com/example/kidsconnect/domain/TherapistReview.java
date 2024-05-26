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
public class TherapistReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int rating;
    private String comment;

    private LocalDateTime inDate;

    private LocalDateTime upDate;


    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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
