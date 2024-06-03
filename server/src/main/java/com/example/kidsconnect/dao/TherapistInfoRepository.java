package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.TherapistInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TherapistInfoRepository extends CrudRepository<TherapistInfo,Long> {


//    @Query("SELECT t FROM therapist_info t WHERE " +
//    "(:experience IS NULL OR t.experience = :experience) AND " +
//    "(:speciality IS NULL OR t.speciality = :speciality) AND " +
//    "(:gender ='')")
//    List<TherapistInfo> findMatchedTherapists(String experience, String speciality, char gender, String address);
}
