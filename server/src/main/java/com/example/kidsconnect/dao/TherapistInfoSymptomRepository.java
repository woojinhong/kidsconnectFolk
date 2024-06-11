package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.TherapistInfoSymptom;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface TherapistInfoSymptomRepository extends CrudRepository<TherapistInfoSymptom,Long> {
    Collection<Object> findByTherapistInfoId(Long id);
}

