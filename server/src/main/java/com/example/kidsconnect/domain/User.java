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

    private Date dateOfBirth;
    @Column(length= 30, nullable = false)
    private String phoneNum;
    @Column(length= 30, nullable = false)
    private String postalCode;
    @Column(length= 50, nullable = false)
    private String addressDetail;
    @Column(length= 30, nullable = false)
    private String address;
    @Column(nullable = false)
    private Boolean status;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CenterReview> centerReview;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TherapistReview> therapistReview;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", phoneNum='" + phoneNum + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", addressDetail='" + addressDetail + '\'' +
                ", address='" + address + '\'' +
                ", status=" + status +
                ", inDate=" + inDate +
                ", upDate=" + upDate +
                '}';
    }
}
