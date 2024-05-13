package com.example.kidsconnect.service;


import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.UserMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
//메서드 @Cacheable(value = "myUser") 같은 효과
@CacheConfig(cacheNames = "myUser")
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //객체 매핑 정보 불러오기
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);


    @Cacheable(key = "#login")
    public ResponseEntity<String> login(LoginDto loginDto) {
        userRepository.findByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword()).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));
        return ResponseEntity.ok("Login successful!");

    }

    @Transactional
    public ResponseEntity<String> signUp(UserSignUpDto userSignUpDto) {
        if(!userRepository.existsByEmail(userSignUpDto.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);

        //mapstruct 객체 매핑 dto -> entity
        User user = userMapper.fromUserSignUpDto(userSignUpDto);

        userRepository.save(user);

        return ResponseEntity.ok("가입 축하드립니다 "+userSignUpDto.getFirstName()+"님");
    }
}

