package com.example.kidsconnect.mapping;

import com.example.kidsconnect.dao.SymptomRepository;
import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.ChildSymptom;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.dto.ChildDto;

import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ChildMapper {



    @Mapping(source = "symptom.id", target = "symptomId")
    ChildDto toChildDto(Child child,Symptom symptom);

    @Mappings({
            @Mapping(source = "childDto.childId", target = "id"),
            @Mapping(target = "childSymptom", ignore = true) // childSymptom은 따로 매핑 처리
    })
    Child fromChildDto(ChildDto childDto);


//
}
