package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import org.mapstruct.Mapper;


    @Mapper(componentModel = "spring")
    public interface UserMapper {
        LoginDto toLoginDTO(User user);
        User fromLoginDto(LoginDto loginDto);

        UserSignUpDto toUserSignUpDto(User user);
        User fromUserSignUpDto(UserSignUpDto userSignUpDto);

    }
