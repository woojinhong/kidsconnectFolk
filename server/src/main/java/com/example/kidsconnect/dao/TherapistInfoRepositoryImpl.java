package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.MatchRequestDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.JPAExpressions;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashMap;
import com.querydsl.core.Tuple;

@Repository
@RequiredArgsConstructor
public class TherapistInfoRepositoryImpl implements TherapistInfoRepositoryCustom {

        private final JPAQueryFactory queryFactory;

        @Override
        public List<MatchResponseDto> findTherapistsByCriteria(MatchRequestDto matchRequestDto) {
                QTherapist qTherapist = QTherapist.therapist;
                QTherapistInfo qTherapistInfo = QTherapistInfo.therapistInfo;
                QSymptom qSymptom = QSymptom.symptom;
                QEnrol qEnrol = QEnrol.enrol;
                QCenter qCenter = QCenter.center;
                QTherapistInfoSymptom qTherapistInfoSymptom = QTherapistInfoSymptom.therapistInfoSymptom;

                // Using the method
   //             BooleanExpression experienceCondition = qTherapistInfo.totalExperience.ne("무경력");
                BooleanExpression experienceCondition = experienceEq(matchRequestDto.getIsExperience());
                BooleanExpression symptomCondition = symptomIn(matchRequestDto.getSymptoms());
                BooleanExpression genderCondition = genderEq(matchRequestDto.getGender());
                JPQLQuery<Long> subQuery = createSubQuery(genderCondition, experienceCondition, symptomCondition);
//                BooleanExpression genderCondition = genderEq(matchRequestDto.getGender());
//                BooleanExpression experienceCondition = experienceEq(matchRequestDto.isExperience());
//                BooleanExpression symptomCondition = symptomIn(matchRequestDto.getSymptoms());

                // 서브쿼리 정의
//                JPQLQuery<Long> subQuery = createSubQuery(genderCondition, experienceCondition, symptomCondition);

                // 메인 쿼리 정의
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
                        .where(qTherapistInfo.id.in(subQuery))
                        .fetch();

                Map<Long, MatchResponseDto> resultMap = new HashMap<>();

                for (Tuple row : results) {
                        Long therapistInfoId = row.get(qTherapistInfo.id);
                        String therapistName = row.get(qTherapist.firstName);
                        String bio = row.get(qTherapistInfo.bio);
                        byte[] imageFile = row.get(qTherapistInfo.imageFile);
                        String totalExperience = row.get(qTherapistInfo.totalExperience);
                        String centerName = row.get(qTherapist.freelancer.when(false).then("프리랜서").otherwise(qCenter.name));
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
                        if (symptomName != null && !dto.getSymptoms().contains(symptomName)) {
                                dto.getSymptoms().add(symptomName);
                        }
                }

                return resultMap.values().stream().collect(Collectors.toList());
        }

        protected JPQLQuery<Long> createSubQuery(BooleanExpression genderCondition, BooleanExpression experienceCondition, BooleanExpression symptomCondition) {
                QTherapist qTherapist = QTherapist.therapist;
                QTherapistInfo qTherapistInfo = QTherapistInfo.therapistInfo;
                QSymptom qSymptom = QSymptom.symptom;
                QEnrol qEnrol = QEnrol.enrol;
                QCenter qCenter = QCenter.center;
                QTherapistInfoSymptom qTherapistInfoSymptom = QTherapistInfoSymptom.therapistInfoSymptom;

                BooleanBuilder builder = new BooleanBuilder();

                if (genderCondition != null) {
                        builder.and(genderCondition);
                }

                if (experienceCondition != null) {
                        builder.and(experienceCondition);
                }

                if (symptomCondition != null) {
                        builder.and(symptomCondition);
                }
                return JPAExpressions
                        .select(qTherapistInfo.id)
                        .from(qTherapistInfo)
                        .join(qTherapistInfo.therapist, qTherapist)
                        .leftJoin(qTherapist.enrol, qEnrol)
                        .leftJoin(qEnrol.center, qCenter)
                        .leftJoin(qTherapistInfo.therapistInfoSymptom, qTherapistInfoSymptom)
                        .leftJoin(qTherapistInfoSymptom.symptom, qSymptom)
                        .where(
                                builder
                        );
        }

        private BooleanExpression genderEq(Character gender) {
                if (gender == null || gender.toString().isEmpty()) {
                        return null;
                }
                return QTherapist.therapist.gender.eq(gender);
        }

        private BooleanExpression experienceEq(boolean isExperience) {
                if (isExperience) {
                        return QTherapistInfo.therapistInfo.totalExperience.ne("무경력");
                }
                return QTherapistInfo.therapistInfo.totalExperience.eq("무경력");
        }

        private BooleanExpression symptomIn(List<String> symptoms) {
                if (symptoms != null && !symptoms.isEmpty()) {
                        return QSymptom.symptom.name.in(symptoms);
                }
                return null;
        }
}