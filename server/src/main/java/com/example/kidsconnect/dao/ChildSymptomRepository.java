package com.example.kidsconnect.dao;

import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.ChildSymptom;
import org.springframework.data.repository.CrudRepository;

public interface ChildSymptomRepository extends CrudRepository<ChildSymptom,Long> {
    ChildSymptom findByChildIdAndSymptomId(Long childId, Long symptomId);
}
