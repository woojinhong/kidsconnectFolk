package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.UserDto;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDTO(User user);
    User toUser(UserDto userDto);
}
