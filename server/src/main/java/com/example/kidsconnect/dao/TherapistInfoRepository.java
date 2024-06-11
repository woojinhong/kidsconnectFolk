package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.dto.MatchResponseDto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TherapistInfoRepository extends CrudRepository<TherapistInfo,Long>, TherapistInfoRepositoryCustom {


//    @Query("SELECT * FROM therapist_info t WHERE " +
//    "(:experience IS NULL OR t.experience = :experience) AND " +
//    "(:speciality IS NULL OR t.speciality = :speciality) AND " +
//    "(:gender IS NULL OR t.gender")
//    List<TherapistInfo> findMatchedTherapists(String experience, String speciality, char gender, String address);
//@Query("SELECT new com.example.kidsconnect.dto.MatchResponseDto(t.firstName, ti.bio, ti.imageFile, ti.totalExperience, " +
//        "CASE WHEN t.freelancer = true THEN '프리랜서' ELSE c.name END) " +
//        "FROM TherapistInfo ti " +
//        "JOIN ti.therapist t " +
//        "LEFT JOIN t.enrol e " +
//        "LEFT JOIN e.center c " +
//        "LEFT JOIN ti.therapistInfoSymptom tis " +
//        "LEFT JOIN tis.symptom s " +
//        "WHERE (:gender IS NULL OR t.gender = :gender) " +
//        "AND (:isExperience IS NULL OR :isExperience = false OR (ti.experience IS NOT EMPTY)) " +
//        "AND (:symptoms IS NULL OR s.name IN :symptoms) " +
//        "GROUP BY t.id, ti.bio, ti.imageFile, ti.totalExperience, c.name")
//List<MatchResponseDto> findTherapistsByCriteria(@Param("gender") Character gender,
//                                                @Param("isExperience") Boolean isExperience,
//                                                @Param("symptoms") List<String> symptoms);
//}

//    @Query("SELECT new com.example.kidsconnect.dto.MatchResponseDto(t.firstName, ti.bio, ti.imageFile, ti.totalExperience, " +
//            "CASE WHEN t.freelancer = true THEN '프리랜서' ELSE c.name END, " +
//            "STRING_AGG(DISTINCT s.name, ', ')) " +
//            "FROM TherapistInfo ti " +
//           "JOIN ti.therapist t " +
//            "LEFT JOIN t.enrol e " +
//            "LEFT JOIN e.center c " +
//            "LEFT JOIN ti.therapistInfoSymptom tis " +
//            "LEFT JOIN tis.symptom s " +
//            "WHERE (:gender IS NULL OR t.gender = :gender) " +
//            "AND (:isExperience IS NULL OR :isExperience = false OR (ti.experience IS NOT EMPTY)) " +
//            "AND (:symptoms IS NULL OR s.name IN :symptoms) " +
//            "GROUP BY t.id, ti.bio, ti.imageFile, ti.totalExperience, c.name")
//    List<MatchResponseDto> findTherapistsByCriteria(@Param("gender") Character gender,
//                                                    @Param("isExperience") Boolean isExperience,
//                                                    @Param("symptoms") List<String> symptoms);

    @Query("SELECT t.firstName, ti.bio, ti.imageFile, ti.totalExperience, " +
            "CASE WHEN t.freelancer = true THEN '프리랜서' ELSE c.name END, s.name " +
            "FROM TherapistInfo ti " +
            "JOIN ti.therapist t " +
            "LEFT JOIN t.enrol e " +
            "LEFT JOIN e.center c " +
            "LEFT JOIN ti.therapistInfoSymptom tis " +
            "LEFT JOIN tis.symptom s " +
            "WHERE (:gender IS NULL OR t.gender = :gender) " +
            "AND (:isExperience IS NULL OR :isExperience = false OR (ti.experience IS NOT EMPTY)) " +
            "AND (:symptoms IS NULL OR s.name IN :symptoms)")
    List<Object[]> findTherapistsByCriterias(@Param("gender") Character gender,
                                            @Param("isExperience") Boolean isExperience,
                                            @Param("symptoms") List<String> symptoms);


    @Query("SELECT ti FROM TherapistInfo ti JOIN FETCH ti.experience WHERE ti.id = 1")
    List<TherapistInfo> findTherapistInfoWithExperiences(@Param("id") Long id);



    @EntityGraph(attributePaths = {"experience"})
    List<TherapistInfo> findAllById(long l);
}
