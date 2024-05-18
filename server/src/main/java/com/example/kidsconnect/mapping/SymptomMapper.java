package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.dto.ChildDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SymptomMapper {
//    @Mapping(source = "dto.symptom_id", target = "id")
//    Symptom fromChildDtoToSymptom(ChildDto dto);
}
