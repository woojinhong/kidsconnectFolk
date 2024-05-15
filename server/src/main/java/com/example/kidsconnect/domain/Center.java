package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phoneNum;
    private String centerNum;
    private String postalCode;
    private String addressDetail;

    private String address;
    @Lob
    private byte[] imageFile;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    private List<CenterReview> centerReview;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    private List<Enrol> enrol;

}
