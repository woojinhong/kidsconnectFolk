package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.TherapistInfoSymptom;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface TherapistInfoSymptomRepository extends CrudRepository<TherapistInfoSymptom,Long> {

    List<TherapistInfoSymptom> findByTherapistInfoId(Long therapistInfoId);
}

