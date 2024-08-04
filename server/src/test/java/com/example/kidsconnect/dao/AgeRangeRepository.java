package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.test.AgeRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeRangeRepository extends JpaRepository<AgeRange, Long> {
}