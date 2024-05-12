package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String gender;
    private String personality;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    private List<ChildSymptom> childSymptom;

}
