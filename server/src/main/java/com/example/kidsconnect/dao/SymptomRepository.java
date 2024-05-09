package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Symptom;
import org.springframework.data.repository.CrudRepository;

public interface SymptomRepository extends CrudRepository<Symptom,Long> {
}
