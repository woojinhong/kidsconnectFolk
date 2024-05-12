package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String pwd;
    private Date dateOfBirth;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;
    private Boolean status;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CenterReview> centerReview;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TherapistReview> therapistReview;

    public User( String firstName, String lastName, String pwd, Date dateOfBirth, String phoneNum, String postalCode, String addressDetail, String address, Boolean status, LocalDateTime inDate, LocalDateTime upDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwd = pwd;
        this.dateOfBirth = dateOfBirth;
        this.phoneNum = phoneNum;
        this.postalCode = postalCode;
        this.addressDetail = addressDetail;
        this.address = address;
        this.status = status;
        this.inDate = inDate;
        this.upDate = upDate;


    }


}
