package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class TherapistInfoRepositoryImpl implements TherapistInfoRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MatchResponseDto> findTherapistsByCriteria(MatchRequestDto matchRequestDto) {
        QTherapist qTherapist = QTherapist.therapist;
        QTherapistInfo qTherapistInfo = QTherapistInfo.therapistInfo;
        QTherapistInfoSymptom qTherapistInfoSymptom = QTherapistInfoSymptom.therapistInfoSymptom;
        QSymptom qSymptom = QSymptom.symptom;
        QEnrol qEnrol = QEnrol.enrol;
        QCenter qCenter = QCenter.center;

        // Step 1: Find therapists based on initial criteria
        List<Long> therapistInfoIds = queryFactory
                .select(qTherapistInfo.id)
                .from(qTherapistInfo)
                .join(qTherapistInfo.therapist, qTherapist)
                .leftJoin(qTherapist.enrol, qEnrol)
                .leftJoin(qEnrol.center, qCenter)
                .leftJoin(qTherapistInfo.therapistInfoSymptom, qTherapistInfoSymptom)
                .leftJoin(qTherapistInfoSymptom.symptom, qSymptom)
                .where(
                        genderEq(matchRequestDto.getGender()),
                        experienceEq(matchRequestDto.isExperience()),
                        symptomIn(matchRequestDto.getSymptoms())
                )
                .fetch();

        // Step 2: Fetch all details for the found therapists including all symptoms
        List<Tuple> results = queryFactory
                .select(
                        qTherapistInfo.id,
                        qTherapist.firstName,
                        qTherapistInfo.bio,
                        qTherapistInfo.imageFile,
                        qTherapistInfo.totalExperience,
                        qTherapist.freelancer.when(true).then("프리랜서").otherwise(qCenter.name),
                        qSymptom.name
                )
                .from(qTherapistInfo)
                .join(qTherapistInfo.therapist, qTherapist)
                .leftJoin(qTherapist.enrol, qEnrol)
                .leftJoin(qEnrol.center, qCenter)
                .leftJoin(qTherapistInfo.therapistInfoSymptom, qTherapistInfoSymptom)
                .leftJoin(qTherapistInfoSymptom.symptom, qSymptom)
                .where(qTherapistInfo.id.in(therapistInfoIds))
                .fetch();

        Map<Long, MatchResponseDto> resultMap = new HashMap<>();

        for (Tuple row : results) {
            Long therapistInfoId = row.get(qTherapistInfo.id);
            String therapistName = row.get(qTherapist.firstName);
            String bio = row.get(qTherapistInfo.bio);
            byte[] imageFile = row.get(qTherapistInfo.imageFile);
            String totalExperience = row.get(qTherapistInfo.totalExperience);
            String centerName = row.get(qTherapist.freelancer.when(true).then("프리랜서").otherwise(qCenter.name));
            String symptomName = row.get(qSymptom.name);

            MatchResponseDto dto = resultMap.get(therapistInfoId);
            if (dto == null) {
                dto = new MatchResponseDto(
                        therapistName,
                        bio,
                        imageFile,
                        totalExperience,
                        centerName,
                        new ArrayList<>()
                );
                resultMap.put(therapistInfoId, dto);
            }
            if (!dto.getSymptoms().contains(symptomName)) {
                dto.getSymptoms().add(symptomName);
            }
        }

        return new ArrayList<>(resultMap.values());
    }

    private BooleanExpression genderEq(Character gender) {
        return gender != null ? QTherapist.therapist.gender.eq(gender) : null;
    }

    private BooleanExpression experienceEq(Boolean isExperience) {
        return isExperience != null && isExperience ? QTherapistInfo.therapistInfo.experience.isNotEmpty() : null;
    }

    private BooleanExpression symptomIn(List<String> symptoms) {
        return symptoms != null && !symptoms.isEmpty() ? QSymptom.symptom.name.in(symptoms) : null;
    }
}

