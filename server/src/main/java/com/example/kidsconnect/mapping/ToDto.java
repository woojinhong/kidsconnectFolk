package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.*;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

public class ToDto extends MapperFactory {

    // from user entity
    public UserSignUpDto fromSignUp(User user) {
        return userMapper.toUserSignUpDto(user);
    }
    public LoginDto fromLogin(User user){
        return userMapper.toLoginDTO(user);
    }

    // from therapist entity -> therapistDto
    public LoginDto fromLogin(Therapist therapist){
        return therapistMapper.toLoginDTO(therapist);
    }

    // from child entity -> to childDto

    public ChildDto fromChildSymptom(Child child, Symptom symptom) {
        return childMapper.toChildDto(child, symptom);
    }

    // from therapistInfo -> to reservationResponseDto

    public ReservationResponseDto fromReservationResponse(Therapist therapist, TherapistInfo therapistInfo, Child child, User user ){
        return reservationMapper.toReservationResponseDto(therapist,therapistInfo,child,user);
    }

}
