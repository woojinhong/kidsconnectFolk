package com.example.kidsconnect.domain.test;

import com.example.kidsconnect.domain.TherapistInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AgeRange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ageRange;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_info_id")
    private TherapistInfo therapistInfo;
}