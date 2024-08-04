package com.example.kidsconnect.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;



import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.Arrays;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@DynamicInsert
public class TherapistInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String bio;
    private String content;

    private String totalExperience;

    private Boolean identityCheck;
    private Boolean crimeCheck;
    @ElementCollection
    @CollectionTable(name = "therapist_certificate", joinColumns = @JoinColumn(name = "therapist_info_id"))
    @Column(name = "certificate")
    private List<String> certificate =new ArrayList<>();
    @ElementCollection
    @CollectionTable(name = "therapist_age_range", joinColumns = @JoinColumn(name = "therapist_info_id"))
    @Column(name = "age_range")
    private List<String> ageRange =new ArrayList<>();
    @Lob
    @Column(name = "image_file", columnDefinition = "BLOB")
    private byte[] imageFile;
    private int viewCnt;

    private LocalDateTime inDate;

    private LocalDateTime upDate;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_id", referencedColumnName = "id")
    private Therapist therapist;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_info_id")
    private List<TherapistEducation> education;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_info_id")
    private List<TherapistExperience> experience;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "therapist_info_id")
    private List<TherapistInfoSymptom> therapistInfoSymptom;

    @OneToMany(mappedBy = "therapistInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TherapistReview> therapistReview;



    public void addTherapistExperience(TherapistExperience therapistExperience){
        if (this.experience == null) {
            this.experience = new ArrayList<>();
        }
        this.experience.add(therapistExperience);
    }
    public void addTherapistEducation(TherapistEducation therapistEducation){
        if (this.education == null) {
            this.education = new ArrayList<>();
        }

        this.education.add(therapistEducation);
    }

    public void addTherapistInfoSymptom(TherapistInfoSymptom therapistInfoSymptom){
        if (this.therapistInfoSymptom == null) {
            this.therapistInfoSymptom = new ArrayList<>();
        }

        this.therapistInfoSymptom.add(therapistInfoSymptom);
    }

    public void setCertificate(List<String> certificate) {
        this.certificate = certificate;
    }

    public void setAgeRange(List<String> ageRange) {
        this.ageRange = ageRange;
    }

    public void setTherapist(Therapist therapist) {
        this.therapist = therapist;
    }


    public void setTotalExperience(String totalExperience) {
        this.totalExperience = totalExperience;
    }

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


    public void updateTherapistInfo(String title, String bio, String content, Boolean identityCheck, Boolean crimeCheck, List<String> certificate, List<String> ageRange, byte[] imageFile) {
        this.title = title;
        this.bio = bio;
        this.content = content;
        this.identityCheck = identityCheck;
        this.crimeCheck = crimeCheck;
        this.certificate = certificate;
        this.ageRange = ageRange;
        this.imageFile = imageFile;
    }

    @Override
    public String toString() {
        return "TherapistInfo{" +
                ", title='" + title + '\'' +
                ", bio='" + bio + '\'' +
                ", content='" + content + '\'' +
                ", identityCheck=" + identityCheck +
                ", crimeCheck=" + crimeCheck +
                ", certificate=" + certificate +
                ", ageRange=" + ageRange +
                ", imageFile=" + Arrays.toString(imageFile) +
                ", viewCnt=" + viewCnt +
                '}';
    }
}
