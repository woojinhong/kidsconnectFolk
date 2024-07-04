package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.TherapistExperience;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TherapistExperienceRepository extends CrudRepository<TherapistExperience,Long> {

    @Query(value = "SELECT " +
            "CONCAT(FLOOR(SUM(e.years * 12 + e.months) / 12), '년 ', " +
            "MOD(SUM(e.years * 12 + e.months), 12), '개월') " +
            "FROM therapist_experience e " +
            "WHERE e.therapist_info_id = :therapistInfoId", nativeQuery = true)
    String getTotalExperience(@Param("therapistInfoId") Long therapistInfoId);

}
