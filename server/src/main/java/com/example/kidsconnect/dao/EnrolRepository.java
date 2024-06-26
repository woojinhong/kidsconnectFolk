package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.Enrol;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EnrolRepository extends CrudRepository<Enrol,Long> {

    List<Enrol> findByTherapistId(Long therapistId);
}
