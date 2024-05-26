package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.Timestamp;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private String postalCode;
    private String addressDetail;

    private LocalDateTime inDate;

    private LocalDateTime upDate;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;
}
