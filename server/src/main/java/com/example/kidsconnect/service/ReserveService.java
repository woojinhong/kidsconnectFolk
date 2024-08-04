package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ReservationRequestDto;
import com.example.kidsconnect.dto.ReservationResponseDto;
import com.example.kidsconnect.dto.UserReservationDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReserveService {
    private final UserService userService;
    private final EnrolService enrolService;
    private final ChildService childService;
    private final TherapistInfoService therapistInfoService;
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    private final ChildSymptomService childSymptomService;
    private final TherapistInfoSymptomService therapistInfoSymptomService;



    @Transactional
    public ResponseEntity<?> createReservation(Long childId, Long therapistId, String location, UserPrinciple userDetails) {

        // User, Child, Therapist 조회
        User user = userService.findById(userDetails.getId());
        Child child = childService.findById(childId);
        TherapistInfo therapistInfo = therapistInfoService.findByTherapistId(therapistId);

        //therapistInfo(치료사 상세정보) 와 연관된 therapist(치료사) 객체 반환  // 상세지역 설정 용도
        Therapist therapist = therapistInfo.getTherapist();

        // locationOption에 따른 addressDetail 설정
        String addressDetail = determineLocation(location, user, therapist);


        // Reservation 매핑 및 저장
        Reservation reservation = reservationMapper.toReservation(user, child, therapistInfo, addressDetail);

        reservationRepository.save(reservation);

        return ResponseEntity.ok("예약 요청이 접수되었습니다.");
    }

    @Transactional
    public ResponseEntity<?> confirmReservation(Long reservationId) {
        //reservation 객체 정보 저장
        Reservation reservation = findReservationById(reservationId);

        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservationRepository.save(reservation);

        return ResponseEntity.ok("예약이 확인되었습니다.");
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getPendingReservations(UserPrinciple userDetails) {
        return getReservationsByStatus(userDetails, ReservationStatus.PENDING);
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getConfirmedReservations(UserPrinciple userDetails) {
        return getReservationsByStatus(userDetails, ReservationStatus.CONFIRMED);
    }

    @Transactional(readOnly = true)
    public List<Long> getUserPendingReservations(UserPrinciple userDetails) {
        return getUserReservationsByStatus(userDetails, ReservationStatus.PENDING);
    }

    @Transactional(readOnly = true)
    public List<Long> getUserConfirmedReservations(UserPrinciple userDetails) {
        return getUserReservationsByStatus(userDetails, ReservationStatus.CONFIRMED);
    }



    private String determineLocation(String locationOption, User user, Therapist therapist) {
        if ("therapist".equals(locationOption)) {
            return therapist.getAddressDetail();
        } else if ("home".equals(locationOption)) {
            return user.getAddressDetail();
        }
        return null;
    }



    private List<ReservationResponseDto> getReservationsByStatus(UserPrinciple userDetails, ReservationStatus status) {
        TherapistInfo therapistInfo = therapistInfoService.findByTherapistId(userDetails.getId());
        List<Reservation> reservations = reservationRepository.findByTherapistInfoAndStatus(therapistInfo, status);

        return reservations.stream()
                .map(reservation -> {
                    ReservationResponseDto dto = reservationMapper.toReservationResponseDto(reservation);
                    List<ChildSymptom> childSymptoms = childSymptomService.findByChildId(reservation.getChild().getId());
                    List<String> symptomNames = childSymptoms.stream()
                            .map(childSymptom -> childSymptom.getSymptom().getName())
                            .collect(Collectors.toList());
                    dto.setChildSymptoms(symptomNames);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private List<Long> getUserReservationsByStatus(UserPrinciple userDetails, ReservationStatus status) {
        User user = userService.findById(userDetails.getId());
        List<Reservation> reservations = reservationRepository.findByUserAndStatus(user, status);

        return reservations.stream()
                .map(reservation -> reservation.getTherapistInfo().getTherapist().getId())
                .distinct()
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Reservation findReservationById(Long Id) {
        return reservationRepository.findById(Id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_RESERVATION));
    }
}
