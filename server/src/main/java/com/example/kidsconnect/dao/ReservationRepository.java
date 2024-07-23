package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.*;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservation,Long> {
    List<Reservation> findByTherapistInfoAndStatus(TherapistInfo therapistInfo, ReservationStatus status);

    List<Reservation> findByUserAndStatus(User user, ReservationStatus pending);

    List<Reservation> findByStatus(ReservationStatus status);

}
