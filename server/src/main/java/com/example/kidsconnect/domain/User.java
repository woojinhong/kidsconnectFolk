package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
@DynamicInsert
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length= 30, nullable = false , unique = true)
    private String email;
    @Column(length= 30, nullable = false)
    private String firstName;
    @Column(length= 30, nullable = false)
    private String lastName;
    @Column(length= 30, nullable = false)
    private String password;

    @Column(length= 30, nullable = false)
    private String phoneNum;
    @Column(length= 30, nullable = false)
    private String postalCode;
    @Column(length= 50, nullable = false)
    private String addressDetail;
    @Column(length= 30, nullable = false)
    private String address;

    private Date dateOfBirth;

    private Boolean status;

    private LocalDateTime inDate;

    private LocalDateTime upDate ;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CenterReview> centerReview;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TherapistReview> therapistReview;


    @PrePersist
    protected void onCreate() {
        if (this.inDate == null) {
            this.inDate = LocalDateTime.now();
        }
        if (this.upDate == null) {
            this.upDate = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.upDate = LocalDateTime.now();
    }

    public User( String email, String firstName, String lastName, String password, Date dateOfBirth, String phoneNum, String postalCode, String addressDetail, String address, Boolean status, LocalDateTime inDate, LocalDateTime upDate) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
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
