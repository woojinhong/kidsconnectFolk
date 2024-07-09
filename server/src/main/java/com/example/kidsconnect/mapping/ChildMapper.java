package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.Symptom;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.ChildRequestDto;

import com.example.kidsconnect.dto.ChildResponseDto;
import com.example.kidsconnect.service.ChildSymptomService;
import com.example.kidsconnect.service.SymptomService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ChildMapper {



    @Mappings({
            @Mapping(target = "symptomName", ignore = true)  // We will set this manually
    })
    ChildResponseDto toChildResponseDto(Child child);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "upDate", ignore = true)
    @Mapping(target = "firstName", source = "childRequestDto.firstName")
    @Mapping(target = "lastName", source = "childRequestDto.lastName")
    @Mapping(target = "dateOfBirth", source = "childRequestDto.dateOfBirth")
    @Mapping(target = "personality", source = "childRequestDto.personality")
    @Mapping(target = "user", source = "user")
    Child fromChildDto(ChildRequestDto childRequestDto, User user);








    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateChildFromDto(ChildRequestDto childRequestDto, @MappingTarget Child child);
}
