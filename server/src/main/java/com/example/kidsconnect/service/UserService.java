package com.example.kidsconnect.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.kidsconnect.config.JwtTokenProvider;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.jwt.LoginFilter;
import com.example.kidsconnect.mapping.ToEntity;

import lombok.RequiredArgsConstructor;

@Service
//메서드 @Cacheable(value = "myUser") 같은 효과
//@CacheConfig(cacheNames = "myUser")
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(LoginFilter.class);
    private final UserRepository userRepository;

    private final ToEntity toEntity;

    private final JwtTokenProvider jwtTokenProvider;
    
    private final PasswordEncoder passwordEncoder;

    //객체 매핑 정보 불러오기



    //사용 추천안함 cacheable
//    @Cacheable(key = "#login")
    public ResponseEntity<?> login(LoginDto loginDto) {
        System.out.println("Received login request with email: " + loginDto.getEmail());
        logger.info("Authentication failed!"+ loginDto.getEmail());
               
        User user = toEntity.fromUserLoginDto(loginDto);
                
        User users = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword()).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        System.out.println(loginDto.getPassword());
        System.out.println(user.getPassword());
        
        // Dto 이메일 패스워드 조건으로 users를 만드는데 왜 한번더 조건을 거는건가요??
//        if (!passwordEncoder.matches(loginDto.getPassword(), users.getPassword())) {
//            throw new CustomException(CustomCode.NOT_VALID_AUTHENTICATION);
//        }
        String accessToken = jwtTokenProvider.createToken(loginDto.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(loginDto.getEmail());
        
//        System.out.println(accessToken);
//        System.out.println(refreshToken);

        
        return ResponseEntity.ok("인증 토큰 : " + accessToken );

    }

    @Transactional
    public ResponseEntity<String> signUp(UserSignUpDto userSignUpDto) {
        //mapstruct = dto -> entity, passwordEncoding.encode
        User user = toEntity.fromUserSignUpDto(userSignUpDto);


        if(userRepository.existsByEmail(user.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);



        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_ADMIN");
        userRepository.save(user);
        return ResponseEntity.ok("부모 회원가입 성공");
    }
        
}

