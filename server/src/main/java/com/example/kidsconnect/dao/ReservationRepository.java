package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Reservation;
import com.example.kidsconnect.domain.ReservationStatus;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservation,Long> {
    List<Reservation> findByTherapistAndStatus(Therapist therapist, ReservationStatus status);

    List<Reservation> findByUserAndStatus(User user, ReservationStatus pending);
}
