package com.example.kidsconnect.dto;

import com.example.kidsconnect.domain.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDto {
    private Long reservationId;
    private Long userId;
    private String userName;
    private Long childId;
    private String childName;
    private Date childAge;
    private Character childGender;
    private String childPersonality;
    private List<String> childSymptoms;
    private String addressDetail;
    private ReservationStatus status;
}