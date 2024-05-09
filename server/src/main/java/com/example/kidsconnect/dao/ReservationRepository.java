package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation,Long> {
}
