package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ReservationRequestDto;
import com.example.kidsconnect.dto.ReservationResponseDto;
import com.example.kidsconnect.dto.UserReservationDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
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
    private final TherapistService therapistService;
    private final ChildService childService;
    private final TherapistRepository therapistRepository;
    private final TherapistInfoSymptomRepository therapistInfoSymptomRepository;
    private final ReservationRepository reservationRepository;




    @Transactional
    public ResponseEntity<?> createReservation(ReservationRequestDto requestDto) {
        // User, Child, Therapist 조회
        User user = userService.findById(requestDto.getUserId());
        Child child = childService.findById(requestDto.getChildId());
        Therapist therapist = therapistService.findById(requestDto.getTherapistId());


        // locationOption에 따른 addressDetail 설정
        String location = determineLocation(requestDto.getLocation(), user, therapist);


        System.out.println("location = " + location);

        Reservation reservation = Reservation.builder()
                .user(user)
                .child(child)
                .therapist(therapist)
                .addressDetail(location)
                .status(ReservationStatus.PENDING)
                .build();

        reservationRepository.save(reservation);
        return ResponseEntity.ok("예약 요청이 접수되었습니다.");
    }

    @Transactional
    public ResponseEntity<?> confirmReservation(Long reservationId) {
        //reservation 저장
        Reservation reservation = findReservationById(reservationId);

        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservationRepository.save(reservation);

        return ResponseEntity.ok("예약이 확인되었습니다.");
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getPendingReservations(Long therapistId) {
        Therapist therapist = therapistService.findById(therapistId);

        List<Reservation> pendingReservations = reservationRepository.findByTherapistAndStatus(therapist, ReservationStatus.PENDING);


        return pendingReservations.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReservationResponseDto> getConfirmedReservations(Long therapistId) {

        Therapist therapist = therapistService.findById(therapistId);


        List<Reservation> confirmedReservations = reservationRepository.findByTherapistAndStatus(therapist, ReservationStatus.CONFIRMED);

        return confirmedReservations.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserReservationDto> getUserPendingReservations(Long userId) {
        User user = userService.findById(userId);

        List<Reservation> pendingReservations = reservationRepository.findByUserAndStatus(user, ReservationStatus.PENDING);

        return pendingReservations.stream().map(this::convertToUserReservationDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserReservationDto> getUserConfirmedReservations(Long userId) {
        User user = userService.findById(userId);

        List<Reservation> confirmedReservations = reservationRepository.findByUserAndStatus(user, ReservationStatus.CONFIRMED);

        return confirmedReservations.stream().map(this::convertToUserReservationDto).collect(Collectors.toList());
    }
    private ReservationResponseDto convertToDto(Reservation reservation) {
        Child child = reservation.getChild();
        User user = reservation.getUser();

        return ReservationResponseDto.builder()
                .reservationId(reservation.getId())
                .userId(user.getId())
                .userName(user.getFirstName() + " " + user.getLastName())
                .childId(child.getId())
                .childName(child.getLastName())
                //.childAge(child.getDateOfBirth())
                .childGender(child.getGender()) // assuming getGender() returns a String
                .childPersonality(child.getPersonality()) // assuming getPersonality() returns a String
                .childSymptoms(child.getChildSymptom()) // assuming getSymptoms() returns a String
                .addressDetail(reservation.getAddressDetail())
                .status(reservation.getStatus())
                .build();
    }


    private UserReservationDto convertToUserReservationDto(Reservation reservation) {
        Therapist therapist = reservation.getTherapist();
        TherapistInfo therapistInfo = reservation.get
        List<String> therapistSymptoms = therapistInfoSymptomRepository.findByTherapistInfoId(therapist.getId())
                .stream().map(symptom -> symptom.getSymptom().getName()).collect(Collectors.toList());

        // therapist.getCenter().getName() - > therapist.getEnrol().getName() therapist -> enrol -> center
        String centerName = therapist.isFreelancer() ? "프리랜서" : therapist.getEnrol().getName();

        return UserReservationDto.builder()
                .reservationId(reservation.getId())
                .therapistId(therapist.getId())
                .therapistName(therapist.getFirstName() + " " + therapist.getLastName())
                .therapistPhone(therapist.getPhoneNum())
                .therapistCenterName(centerName)
                .therapistTotalExperience(therapistInfo.getTotalExperience())
                .therapistSymptoms(therapistSymptoms)
                .addressDetail(reservation.getAddressDetail())
                .status(reservation.getStatus())
                .build();
    }


    private String determineLocation(String locationOption, User user, Therapist therapist) {
        if ("therapist".equals(locationOption)) {
            return therapist.getAddressDetail();
        } else if ("home".equals(locationOption)) {
            return user.getAddressDetail();
        }
        return null;
    }
    @Transactional(readOnly = true)
    public Reservation findReservationById(Long Id) {
        return reservationRepository.findById(Id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_RESERVATION));
    }


}
