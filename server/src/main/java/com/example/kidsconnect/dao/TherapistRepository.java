package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TherapistRepository extends CrudRepository<Therapist,Long> {
    boolean existsByEmail(String email);
    Optional<Therapist> findByEmailAndPassword(String email, String password);

}
