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


    // Update 메서드 추가
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUserFromSignUpDto(UserSignUpDto userSignUpDto, @MappingTarget User user);
}

