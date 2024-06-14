package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.*;

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



    // from therapistInfo -> to reservationResponseDto

//    public ReservationResponseDto fromReservationResponse(Therapist therapist, TherapistInfo therapistInfo, Child child, User user ){
//        return reservationMapper.toReservationResponseDto(therapist,therapistInfo,child,user);
//    }

}
