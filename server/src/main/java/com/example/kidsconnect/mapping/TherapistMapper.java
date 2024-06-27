package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Therapist;

import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.TherapistResponseDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TherapistMapper {



    LoginDto toLoginDTO(Therapist therapist);

    Therapist fromLoginDto(LoginDto loginDto);
    TherapistSignUpDto toTherapistSignUpDto(Therapist therapist);
    Therapist fromTherapistSignUpDto(TherapistSignUpDto therapistSignUpDto);

    @Mapping(target = "centerName", source = "centerNames")
    TherapistResponseDto toTherapistResponseDto(Therapist therapist, List<String> centerNames);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Therapist updateTherapistFromSignUpDto(TherapistSignUpDto therapistSignUpDto, @MappingTarget Therapist therapist);
}
