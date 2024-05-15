package com.example.kidsconnect.mapping;


import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.TherapistRequest;
import com.example.kidsconnect.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TherapistMapper {

    Therapist toTherapist(TherapistRequest therapistRequest);

}
