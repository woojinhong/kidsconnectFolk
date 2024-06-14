//package com.example.kidsconnect.controller;
//
//import com.example.kidsconnect.domain.Reservation;
//import com.example.kidsconnect.dto.ReservationRequestDto;
//import com.example.kidsconnect.dto.ReservationResponseDto;
//import com.example.kidsconnect.dto.TherapistSignUpDto;
//import com.example.kidsconnect.dto.UserReservationDto;
//import com.example.kidsconnect.service.MatchService;
//import com.example.kidsconnect.service.ReserveService;
//import com.example.kidsconnect.service.TherapistInfoService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/reservation")
//@RequiredArgsConstructor
//public class ReserveController {
//
//    private final MatchService matchService;
//    private final ReserveService reserveService;
//
//
//    @GetMapping("/pending/{therapistId}")
//    public ResponseEntity<List<ReservationResponseDto>> getPendingReservations(@PathVariable Long therapistId) {
//        List<ReservationResponseDto> pendingReservations = reserveService.getPendingReservations(therapistId);
//        return ResponseEntity.ok(pendingReservations);
//    }
//
//    @GetMapping("/confirmed/{therapistId}")
//    public ResponseEntity<List<ReservationResponseDto>> getConfirmedReservations(@PathVariable Long therapistId) {
//        List<ReservationResponseDto> confirmedReservations = reserveService.getConfirmedReservations(therapistId);
//        return ResponseEntity.ok(confirmedReservations);
//    }
//    @PostMapping("{}")
//    public ResponseEntity<?> createReservation(@RequestBody ReservationRequestDto request) {
//
//        return reserveService.createReservation(request);
//    }
//    @PostMapping("/{reservationId}/confirm")
//    public ResponseEntity<?> confirmReservation(@PathVariable Long reservationId) {
//        return reserveService.confirmReservation(reservationId);
//    }
//
//    @GetMapping("/pending/user/{userId}")
//    public ResponseEntity<List<UserReservationDto>> getUserPendingReservations(@PathVariable Long userId) {
//        List<UserReservationDto> pendingReservations = reserveService.getUserPendingReservations(userId);
//        return ResponseEntity.ok(pendingReservations);
//    }
//
//    @GetMapping("/confirmed/user/{userId}")
//    public ResponseEntity<List<UserReservationDto>> getUserConfirmedReservations(@PathVariable Long userId) {
//        List<UserReservationDto> confirmedReservations = reserveService.getUserConfirmedReservations(userId);
//        return ResponseEntity.ok(confirmedReservations);
//    }
//
//}
//
