package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@DynamicInsert
@ToString
public class Therapist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;
    private Character gender;
    private boolean freelancer;
    private boolean status;
    private Date dateOfBirth;


    private LocalDateTime inDate;

    private LocalDateTime upDate;


    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<Enrol> enrol;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<Reservation> reservation;


    @OneToOne(mappedBy = "therapist", cascade = CascadeType.ALL)
    private TherapistInfo therapistInfo;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<TherapistReview> therapistReview;


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
