package com.example.kidsconnect.mapping;

import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserMapperTest {
    @Autowired
    UserRepository userRepository;
    
    //매핑 인터페이스 정보를 불러오는 코드
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    @Test
    @DisplayName("객체 매핑 테스트")
    public void testUserToLoginDto() {
        // given
        Optional<User> optionalUser = userRepository.findByEmailAndPassword("orolzleim2@gmail.com", "1234");
        assertTrue(optionalUser.isPresent()); // Optional에 값이 있는지 확인

        User user = optionalUser.get(); // Optional에서 사용자 객체를 가져옴
        // when
        LoginDto loginDto = userMapper.toLoginDTO(user);

        // then

        assertEquals(user.getPassword(), loginDto.getPassword());
        assertEquals(user.getEmail(), loginDto.getEmail());

        System.out.println("userDto = " + loginDto);
    }
}
