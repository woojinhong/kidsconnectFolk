package com.example.kidsconnect.controller;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.ReservationRequestDto;
import com.example.kidsconnect.dto.ReservationResponseDto;

import com.example.kidsconnect.dto.UserReservationDto;


import com.example.kidsconnect.service.ReserveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservation")
@RequiredArgsConstructor
public class ReserveController {

    private final ReserveService reserveService;


    @GetMapping("/pending/therapist")
    public List<ReservationResponseDto> getPendingReservations(@AuthenticationPrincipal UserPrinciple userDetails) {
        return reserveService.getPendingReservations(userDetails);
    }

    @GetMapping("/confirmed/therapist")
    public List<ReservationResponseDto> getConfirmedReservations(@AuthenticationPrincipal UserPrinciple userDetails) {
        return reserveService.getConfirmedReservations(userDetails);
    }
    @PostMapping("/child/{childId}/therapist/{therapistId}")
    public ResponseEntity<?> createReservation(@PathVariable Long childId, @PathVariable Long therapistId, @RequestBody String location, @AuthenticationPrincipal UserPrinciple userDetails) {
        return reserveService.createReservation(childId, therapistId, location, userDetails);
    }
    @PostMapping("/{reservationId}/confirm")
    public ResponseEntity<?> confirmReservation(@PathVariable Long reservationId) {
        return reserveService.confirmReservation(reservationId);
    }

    @GetMapping("/pending/user")
    public List<Long> getUserPendingReservations(@AuthenticationPrincipal UserPrinciple userDetails) {
        return reserveService.getUserPendingReservations(userDetails);
    }

    @GetMapping("/confirmed/user")
    public  List<Long> getUserConfirmedReservations(@AuthenticationPrincipal UserPrinciple userDetails) {
        return reserveService.getUserConfirmedReservations(userDetails);
    }

}

