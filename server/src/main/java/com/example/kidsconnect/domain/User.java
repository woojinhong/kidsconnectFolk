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
@DynamicInsert
public class User implements Loginable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length= 30, nullable = false , unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(length= 30, nullable = false)
    private String firstName;
    @Column(length= 30, nullable = false)
    private String lastName;
    @Column(nullable = false)
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

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Child> children;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private List<CenterReview> centerReview;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Reservation> reservation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
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
            this.status = true;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", phoneNum='" + phoneNum + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", addressDetail='" + addressDetail + '\'' +
                ", address='" + address + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", status=" + status +
                ", inDate=" + inDate +
                ", upDate=" + upDate +
                '}';
    }

    public void setEmail(String email){
        this.email=email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public Long id() {
        return id;
    }
    @Override
    public String email() {
        return email;
    }

    @Override
    public String password() {
        return password;
    }

    @Override
    public Enum role() {
        return role;
    }
}
