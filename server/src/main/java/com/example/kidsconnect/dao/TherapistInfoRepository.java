package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.TherapistInfo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
public interface TherapistInfoRepository extends CrudRepository<TherapistInfo,Long>, TherapistInfoRepositoryCustom {

    Optional<TherapistInfo> findByTherapistId(Long therapistId);
}
