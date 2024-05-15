package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import org.mapstruct.factory.Mappers;

public class ToDto {

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    private final TherapistMapper therapistMapper = Mappers.getMapper(TherapistMapper.class);


    //
    public UserSignUpDto fromSignUp(User user) {
        return userMapper.toUserSignUpDto(user);
    }
    public LoginDto fromLogin(User user){
        return userMapper.toLoginDTO(user);
    }

    public LoginDto fromLogin(Therapist therapist){
        return therapistMapper.toLoginDTO(therapist);
    }
}
