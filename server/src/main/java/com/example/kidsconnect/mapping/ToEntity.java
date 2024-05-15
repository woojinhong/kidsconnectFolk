package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
public class ToEntity {
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    private final TherapistMapper therapistMapper = Mappers.getMapper(TherapistMapper.class);


    //to user entity
    public User fromUserSignUpDto(UserSignUpDto dto) {
        return userMapper.fromUserSignUpDto(dto);
    }

    public User fromUserLoginDto(LoginDto dto){
        return userMapper.fromLoginDto(dto);
    }

    //to therapist entity
    public Therapist fromTherapistSignUpDto(TherapistSignUpDto dto) {
        return therapistMapper.fromTherapistSignUpDto(dto);
    }
    public Therapist fromTherapistLoginDto(LoginDto dto){
        return therapistMapper.fromLoginDto(dto);
    }


}
