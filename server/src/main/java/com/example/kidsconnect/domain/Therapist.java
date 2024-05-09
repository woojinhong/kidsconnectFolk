package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Therapist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String pwd;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;
    private Boolean status;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;


    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<Enrol> enrol;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<Reservation> reservation;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<TherapistExperience> therapistExperience;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<TherapistInfo> therapistInfo;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<TherapistReview> therapistReview;

}
