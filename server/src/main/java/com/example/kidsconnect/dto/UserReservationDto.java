package com.example.kidsconnect.dto;

import com.example.kidsconnect.domain.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserReservationDto {
    private Long reservationId;
    private Long therapistId;
    private String therapistName;
    private String therapistPhone;
    private String therapistCenterName;
    private String therapistTotalExperience;
    private List<String> therapistSymptoms;
    private String addressDetail;
    private ReservationStatus status;
}