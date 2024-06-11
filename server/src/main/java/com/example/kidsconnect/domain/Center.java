package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@DynamicInsert
@ToString
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

    private LocalDateTime inDate;

    private LocalDateTime upDate;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "center_id")
    private List<CenterReview> centerReview;

    @OneToMany(mappedBy = "center",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrol> enrol;



    @PrePersist
    protected void onCreate() {
        if (this.inDate == null) {
            this.inDate = LocalDateTime.now();
        }
        if (this.upDate == null) {
            this.upDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.upDate = LocalDateTime.now();
    }
}
