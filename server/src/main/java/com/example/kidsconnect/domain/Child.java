package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
@DynamicInsert
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private char gender;

    private String personality;

    private LocalDateTime inDate;

    private LocalDateTime upDate;


    @OneToMany(mappedBy = "child", orphanRemoval = true)
    private List<Reservation> reservation;

    @ManyToOne(fetch = FetchType.LAZY)
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

    @Override
    public String toString() {
        return "Child{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", gender=" + gender +
                ", personality=" + personality +
                ", inDate=" + inDate +
                ", upDate=" + upDate +
                '}';
    }

    @PreUpdate
    protected void onUpdate() {
        this.upDate = LocalDateTime.now();
    }
}
