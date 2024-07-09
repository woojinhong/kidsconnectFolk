package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.domain.TherapistInfoSymptom;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SymptomRepository extends CrudRepository<Symptom,Long> {

    Optional<Symptom> findByName(TherapistInfoSymptom symptom);

    Optional<Symptom> findByName(String name);

}
