package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ChildDto;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.dto.UserSignUpDto;
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

    // from therapistInfo -> to therapistInfoDto

}
