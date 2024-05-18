package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.Center;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CenterRepository extends CrudRepository<Center,Long> {
    Optional<Center> findByName(String centerName);
}
