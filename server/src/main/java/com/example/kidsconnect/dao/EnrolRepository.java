package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.Enrol;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrolRepository extends CrudRepository<Enrol,Long> {

    @Query("SELECT c.name FROM Enrol e JOIN e.center c WHERE e.therapist.id = :therapistId")
    List<String> findCenterNamesByTherapistId(@Param("therapistId") Long therapistId);
    List<Enrol> findByTherapistId(Long therapistId);
}
