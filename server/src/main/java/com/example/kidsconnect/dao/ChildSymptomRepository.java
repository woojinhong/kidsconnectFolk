package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.ChildSymptom;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChildSymptomRepository extends CrudRepository<ChildSymptom,Long> {
    ChildSymptom findByChildIdAndSymptomId(Long childId, Long symptomId);

    List<ChildSymptom> findByChildId(Long childId);
    ChildSymptom deleteByChildId(Long childId);
}
