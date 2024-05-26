package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.*;

import org.springframework.stereotype.Component;

@Component
public class ToEntity extends MapperFactory{

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


    //to child entity

    public Child fromChildDto(ChildDto dto){
        return childMapper.fromChildDto(dto);
    }


    //to center
    public Center fromChildDtoToCenter(TherapistSignUpDto dto){
        return centerMapper.fromTherapistSignUpDto(dto);
    }

    //to TherapistInfo
    public TherapistInfo toTherapistInfo(TherapistInfoDto dto){
        return therapistInfoMapper.toTherapistInfo(dto);
    }
}
