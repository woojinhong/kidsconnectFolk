package com.example.kidsconnect.service;


import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.mapping.ToEntity;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
//메서드 @Cacheable(value = "myUser") 같은 효과
@CacheConfig(cacheNames = "myUser")
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final ToEntity toEntity;

    //객체 매핑 정보 불러오기



    //사용 추천안함 cacheable
    @Cacheable(key = "#login")
    public ResponseEntity<?> login(LoginDto loginDto) {
        User user = toEntity.fromUserLoginDto(loginDto);

        userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword()).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        return ResponseEntity.ok("부모 로그인 성공");

    }

    @Transactional
    public ResponseEntity<String> signUp(UserSignUpDto userSignUpDto) {
        //dto -> entity(mapStruct)
        User user = toEntity.fromUserSignUpDto(userSignUpDto);

        System.out.println("user = " + user);
        if(userRepository.existsByEmail(user.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);

        userRepository.save(user);
        return ResponseEntity.ok("부모 회원가입 성공");
    }
}

