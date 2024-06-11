package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface UserMapper {

    LoginDto toLoginDTO(User user);

    User fromLoginDto(LoginDto loginDto);

    UserSignUpDto toUserSignUpDto(User user);

    User fromUserSignUpDto(UserSignUpDto userSignUpDto);

//    @AfterMapping
//    default void encryptPassword(@MappingTarget User user, UserSignUpDto userSignUpDto, @Autowired PasswordEncoder passwordEncoder) {
//        System.out.println("Encrypting password...");
//        user.setPassword(passwordEncoder.encode(user.getPassword()))
//
//    }
}