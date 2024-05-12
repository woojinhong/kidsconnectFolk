package com.example.kidsconnect.mapping;

import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.UserDto;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserMapperTest {
    @Autowired
    UserRepository userRepository;
    
    //매핑 인터페이스 정보를 불러오는 코드
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    @Test
    public void testUserToUserDto() {
        // given
        User user =userRepository.findByEmailAndPassword("orolzleim2@gmail.com","1234");

        // when
        UserDto userDto = userMapper.toUserDTO(user);

        // then
        assertEquals(user.getStatus(), userDto.getStatus());
        assertEquals(user.getPassword(), userDto.getPassword());
        assertEquals(user.getEmail(), userDto.getEmail());

        System.out.println("userDto = " + userDto);
    }
}
