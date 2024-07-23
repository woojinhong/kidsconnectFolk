package com.example.kidsconnect.service;



import com.example.kidsconnect.dao.ChildRepository;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.*;

import com.example.kidsconnect.dto.LoginDto;

import com.example.kidsconnect.dto.UserResponseDto;
import com.example.kidsconnect.jwt.TokenProvider;
import com.example.kidsconnect.jwt.dto.TokenInfo;

import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;



@Service
//메서드 @Cacheable(value = "myUser") 같은 효과
//@CacheConfig(cacheNames = "myUser")
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final ChildRepository childRepository;
    private final TokenProvider tokenProvider;


    @Transactional(readOnly = true)
    public UserResponseDto showUser(UserPrinciple userDetails) {

        User user = findById(userDetails.getId());

        return userMapper.toUserResponseDto(user);
    }

    @Transactional
    public ResponseEntity<String> signUp(UserSignUpDto userSignUpDto) {

        System.out.println("userSignUpDto = " + userSignUpDto);
        //엔티티 매핑
        User user = userMapper.fromUserSignUpDto(userSignUpDto);

        System.out.println(user);

        //이메일 중복 체크
        validateEmail(user);
        //비밀번호 엔코딩
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //권한 부여
        user.setRole(Role.ROLE_USER);
        //유저 상태(탈퇴 여부)
        user.setStatus(true);

        userRepository.save(user);

        return ResponseEntity.ok("부모 회원가입 성공");
    }


    @Transactional
    public ResponseEntity<?> login(LoginDto loginDto) {
        //loginDto -> User
        User userEntity = userMapper.fromLoginDto(loginDto);

        User user = findUserByEmail(userEntity.getEmail());
            
        checkPassword(loginDto.getPassword(), user);

        //token 생성, 헤더에 삽입
        TokenInfo tokenInfo = tokenProvider.createToken(user);
        HttpHeaders httpHeaders = tokenProvider.setHttpHeaders(tokenInfo);

        return ResponseEntity.ok().headers(httpHeaders).body("부모 로그인 성공");
    }

    @Transactional
    public ResponseEntity<String> updateUser( UserSignUpDto userSignUpDto, UserPrinciple userDetails) {
        User existingUser = findById(userDetails.getId());

        // 사용자 권한 검증
        verifyUserOwnership(existingUser, userDetails);


        //update mapstruct
        userMapper.updateUserFromSignUpDto(userSignUpDto, existingUser);

        // 비밀번호가 변경된 경우에만 업데이트
        updatePasswordIfChanged(userSignUpDto, existingUser);

        userRepository.save(existingUser);

        return ResponseEntity.ok("부모 정보 수정 성공");
    }


    @Transactional
    public ResponseEntity<?> deleteUser(UserPrinciple userDetails) {
        User user = findById(userDetails.getId());

        userRepository.deleteById(user.getId());

        return ResponseEntity.ok("부모 삭제 성공");
    }

    private void updatePasswordIfChanged(UserSignUpDto userSignUpDto, User existingUser) {
        String newPassword = userSignUpDto.getPassword();
        if (newPassword != null && !newPassword.isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(newPassword));
        }
    }
    //사용자 권한 검증
    private void verifyUserOwnership(User user, UserPrinciple userDetails) {
        if (!user.getId().equals(userDetails.getId())) {
            throw new CustomException(CustomCode.NOT_VALID_OWNER);
        }
    }

    private void checkPassword(String rawPassword, User user) {
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new CustomException(CustomCode.NOT_VALID_PASSWORD);
        }
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> {
            throw new CustomException(CustomCode.NOT_FOUND_USER);
        });
    }

    //이메일 중복 검사
    private void validateEmail(User user) {
        if (userRepository.existsByEmail(user.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);
    }

    //id로 부모 정보 반환
    @Transactional(readOnly = true)
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_USER));
    }




    //이메일, 비번으로 부모 정보 반환
    @Transactional(readOnly = true)
    public User findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_USER));

    }

}

