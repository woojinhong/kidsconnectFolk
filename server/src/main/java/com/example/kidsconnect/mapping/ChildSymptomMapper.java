package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.ChildSymptom;

import com.example.kidsconnect.dto.ChildDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChildSymptomMapper {
//    @Mapping(source = "dto.symptomId", target = "id")
//    ChildSymptom fromChildDto(ChildDto dto);
}
