package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class CenterReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int rating;
    private String comment;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime inDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime upDate;

    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
