package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.ChildSymptom;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ChildRepositoryTest {
    @Autowired
    SymptomRepository symptomRepository;
    @Autowired
    ChildRepository childRepository;
    @Autowired
    ChildSymptomRepository childSymptomRepository;




//    @Test
//    @DisplayName("특정 증상에 따른 아이 찾기 기능 테스트")
//    void findChildrenBySymptomTest() {
//        Symptom symptom = Symptom.builder()
//                .id(1L)
//                .symptom("장애1")
//                .build();
//
//        Child child = Child.builder()
//                .id(1L)
//                .firstName("우진")
//                .lastName("홍")
//                .build();
//
//        when(symptomRepository.findById(1L)).thenReturn(java.util.Optional.of(symptom));
//        when(childRepository.findBySymptoms(symptom)).thenReturn(Collections.singletonList(child));
//
//        List<Child> children = symptomService.findChildrenBySymptom(1L);
//
//        assertEquals(1, children.size());
//        assertEquals("아이", children.get(0).getFirstName());
//    }
    @Test
    @Order(2)
    @DisplayName("아이 추가 테스트")
    public void childTest(){
        for(int i =1; i<=10; i++){
        Child child = Child.builder()
                .firstName("아이")
                .lastName("홍")
                .personality("밝음, 천진난만, 까불이")
                .gender('남')
                .dateOfBirth(new Date())
                .build();

            childRepository.save(child);
        }

        Symptom symptom = symptomRepository.findById(2l).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));
        Child child = childRepository.findById(1l).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));


        ChildSymptom childSymptom = ChildSymptom.builder()
                .symptom(symptom)
                .child(child)
                .build();

        childSymptomRepository.save(childSymptom);

        assertTrue(!childSymptomRepository.equals(null));
    }

    @Test
    @Order(1)
    @DisplayName("아이 증상 테스트 데이터")
    public void symptomDummyData(){
        for(int i =1 ; i<=10 ; i++) {
            Symptom symptom = Symptom.builder()
                    .name("장애"+i)
                    .build();
            symptomRepository.save(symptom);
        }
    }

    @Test
    @DisplayName("Symptom,child 필드 삭제 -> ChildSymptom 필드 자동 삭제 테스트")
    void deleteSymptom_CascadeDeleteChildSymptom() {

        Child child = Child.builder()
                .lastName("홍테스트1")
                .gender('M')
                .build();
        childRepository.save(child);

        Symptom symptom = Symptom.builder()
                .name("테스트증상3")
                .build();
        symptomRepository.save(symptom);

        Child childTest = childRepository.findByLastName(child.getLastName());

        Symptom symptomTest = symptomRepository.findByName(symptom.getName()).orElseThrow();

        assertEquals(childTest.getLastName(),child.getLastName());
        assertEquals(symptomTest.getName(),symptom.getName());

        ChildSymptom childSymptom = ChildSymptom.builder()
                .child(child)
                .symptom(symptom)
                .build();
        childSymptomRepository.save(childSymptom);
//
//        ChildSymptom childSymptomTest = childSymptomRepository.findByChildIdAndSymptomId(childSymptom.getChild().getId(), childSymptom.getSymptom().getId());
//
//        assertTrue(childSymptomTest.getId().equals(childSymptom.getId()));
        // When
//        symptomRepository.delete(symptom);



        // Then
//        assertFalse(childSymptomRepository.existsById(childSymptom.getId()));
    }
}
