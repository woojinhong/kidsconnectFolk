package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.ChildRequestDto;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ChildMapper {



    //@Mapping(source = "symptom.name", target = "symptomName")
    ChildRequestDto toChildDto(Child child, Symptom symptom);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "upDate", ignore = true)
    @Mapping(target = "firstName", source = "childRequestDto.firstName")
    @Mapping(target = "lastName", source = "childRequestDto.lastName")
    @Mapping(target = "dateOfBirth", source = "childRequestDto.dateOfBirth")
    @Mapping(target = "personality", source = "childRequestDto.personality")
    @Mapping(target = "user", source = "user")
    Child fromChildDto(ChildRequestDto childRequestDto, User user);

//
}
