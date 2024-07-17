//package com.example.kidsconnect.dao;
//
//import com.example.kidsconnect.domain.*;
//import com.example.kidsconnect.dto.MatchRequestDto;
//import com.example.kidsconnect.dto.MatchResponseDto;
//import com.querydsl.core.Tuple;
//import com.querydsl.core.types.dsl.BooleanExpression;
//import com.querydsl.jpa.JPQLQuery;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class TherapistInfoRepositoryImplTest {
//
//    @Mock
//    private JPAQueryFactory queryFactory;
//
//    @InjectMocks
//    private TherapistInfoRepositoryImpl therapistInfoRepository;
//
//    private QTherapist qTherapist;
//    private QTherapistInfo qTherapistInfo;
//    private QSymptom qSymptom;
//    private QEnrol qEnrol;
//    private QCenter qCenter;
//    private QTherapistInfoSymptom qTherapistInfoSymptom;
//
//    @BeforeEach
//    void setUp() {
//        qTherapist = QTherapist.therapist;
//        qTherapistInfo = QTherapistInfo.therapistInfo;
//        qSymptom = QSymptom.symptom;
//        qEnrol = QEnrol.enrol;
//        qCenter = QCenter.center;
//        qTherapistInfoSymptom = QTherapistInfoSymptom.therapistInfoSymptom;
//    }
//
//    @Test
//    void findTherapistsByCriteria_shouldReturnMatchingTherapists() {
//        // given
//        MatchRequestDto matchRequestDto = new MatchRequestDto();
//        matchRequestDto.setGender(null);
//        matchRequestDto.setExperience(true);
//        matchRequestDto.setSymptoms(Arrays.asList("테스트증상3"));
//
//        // Mock된 데이터 설정
//        Tuple mockTuple = mock(Tuple.class);
//        when(mockTuple.get(qTherapistInfo.id)).thenReturn(1L);
//        when(mockTuple.get(qTherapist.firstName)).thenReturn("John Doe");
//        when(mockTuple.get(qTherapistInfo.bio)).thenReturn("Experienced therapist");
//        when(mockTuple.get(qTherapistInfo.imageFile)).thenReturn(new byte[0]);
//        when(mockTuple.get(qTherapistInfo.totalExperience)).thenReturn("10 years");
//        when(mockTuple.get(qCenter.name)).thenReturn("프리랜서");
//        when(mockTuple.get(qSymptom.name)).thenReturn("테스트증상3");
//
//        List<Tuple> mockResults = Arrays.asList(mockTuple);
//
//        // Mock the QueryFactory behavior
//        when(queryFactory.select(
//                qTherapistInfo.id,
//                qTherapist.firstName,
//                qTherapistInfo.bio,
//                qTherapistInfo.imageFile,
//                qTherapistInfo.totalExperience,
//                qTherapist.freelancer.when(true).then("프리랜서").otherwise(qCenter.name),
//                qSymptom.name
//        )).thenReturn(queryFactory);
//        when(queryFactory.from(qTherapistInfo)).thenReturn(queryFactory);
//        when(queryFactory.join(qTherapistInfo.therapist, qTherapist)).thenReturn(queryFactory);
//        when(queryFactory.leftJoin(qTherapist.enrol, qEnrol)).thenReturn(queryFactory);
//        when(queryFactory.leftJoin(qEnrol.center, qCenter)).thenReturn(queryFactory);
//        when(queryFactory.leftJoin(qTherapistInfo.therapistInfoSymptom, qTherapistInfoSymptom)).thenReturn(queryFactory);
//        when(queryFactory.leftJoin(qTherapistInfoSymptom.symptom, qSymptom)).thenReturn(queryFactory);
//        when(queryFactory.where(any())).thenReturn(queryFactory);
//        when(queryFactory.fetch()).thenReturn(mockResults);
//
//        // when
//        List<MatchResponseDto> actualResponses = therapistInfoRepository.findTherapistsByCriteria(matchRequestDto);
//
//        // then
//        assertThat(actualResponses).isNotNull();
//        assertThat(actualResponses).hasSize(1);
//        assertThat(actualResponses.get(0).getTherapistName()).isEqualTo("John Doe");
//
//        // Verify that the queryFactory was called as expected
//        verify(queryFactory).select(
//                qTherapistInfo.id,
//                qTherapist.firstName,
//                qTherapistInfo.bio,
//                qTherapistInfo.imageFile,
//                qTherapistInfo.totalExperience,
//                qTherapist.freelancer.when(true).then("프리랜서").otherwise(qCenter.name),
//                qSymptom.name
//        );
//        verify(queryFactory).from(qTherapistInfo);
//        verify(queryFactory).join(qTherapistInfo.therapist, qTherapist);
//        verify(queryFactory).leftJoin(qTherapist.enrol, qEnrol);
//        verify(queryFactory).leftJoin(qEnrol.center, qCenter);
//        verify(queryFactory).leftJoin(qTherapistInfo.therapistInfoSymptom, qTherapistInfoSymptom);
//        verify(queryFactory).leftJoin(qTherapistInfoSymptom.symptom, qSymptom);
//        verify(queryFactory).where(any());
//        verify(queryFactory).fetch();
//    }
//
//    @Test
//    void createSubQuery_shouldReturnValidSubQuery() {
//        // given
//        BooleanExpression genderCondition = qTherapist.gender.in('M', 'F');
//        BooleanExpression experienceCondition = qTherapistInfo.totalExperience.isNotNull()
//                .and(qTherapistInfo.totalExperience.ne("무경력"));
//        BooleanExpression symptomCondition = qSymptom.name.in("테스트증상3");
//
//        // when
//        JPQLQuery<Long> subQuery = therapistInfoRepository.createSubQuery(genderCondition, experienceCondition, symptomCondition);
//
//        // then
//        assertThat(subQuery).isNotNull();
//        String queryString = subQuery.toString();
//        assertThat(queryString).contains("select therapistInfo.id");
//        assertThat(queryString).contains("from TherapistInfo therapistInfo");
//        assertThat(queryString).contains("join therapistInfo.therapist as therapist");
//        assertThat(queryString).contains("left join therapist.enrol as enrol");
//        assertThat(queryString).contains("left join enrol.center as center");
//        assertThat(queryString).contains("left join therapistInfo.therapistInfoSymptom as therapistInfoSymptom");
//        assertThat(queryString).contains("left join therapistInfoSymptom.symptom as symptom");
//        assertThat(queryString).contains("therapist.gender in (:gender)");
//        assertThat(queryString).contains("therapistInfo.totalExperience is not null");
//        assertThat(queryString).contains("therapistInfo.totalExperience <> :experience");
//        assertThat(queryString).contains("symptom.name in (:symptom)");
//    }
//}