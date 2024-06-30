package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@DynamicInsert
@ToString
public class TherapistEducation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String education;
    private String degree;
    @Column(nullable = false, length = 30)
    private String status;


}
