package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.*;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    public TherapistInfo requsetToTherapistInfo(ReservationRequestDto dto){
        return reservationMapper.requestToTherapistInfo(dto);
    }

    //to TherapistReview
    public TherapistReview toTherapistReview(ReviewDto reviewDTO, TherapistInfo therapistInfo, User user){
        return reviewMapper.toTherapistReview(reviewDTO,therapistInfo,user);
    }

    @AfterMapping
    public void encryptPassword(@MappingTarget User.UserBuilder user, UserSignUpDto userSignUpDto, @Autowired PasswordEncoder passwordEncoder) {
        System.out.println("Encrypting password...");
        user.password(passwordEncoder.encode(userSignUpDto.getPassword()));
    }
}
