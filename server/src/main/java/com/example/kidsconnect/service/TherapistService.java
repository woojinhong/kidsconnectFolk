package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.*;

import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.jwt.TokenProvider;
import com.example.kidsconnect.jwt.dto.TokenInfo;
import com.example.kidsconnect.mapping.TherapistMapper;
import com.example.kidsconnect.mapping.ToEntity;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository therapistRepository;

    private final EnrolRepository enrolRepository;
    private final CenterService centerService;

    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    private final TherapistMapper therapistMapper;
    private final EnrolService enrolService;

    public TherapistResponseDto showTherapist(UserPrinciple userDetails) {
        Therapist therapist = findById(userDetails.getId());


        List<String> centerNames = enrolRepository.findCenterNamesByTherapistId(therapist.getId());
        return therapistMapper.toTherapistResponseDto(therapist,centerNames);
    }


    @Transactional(readOnly = true)
    public ResponseEntity<?> login(LoginDto loginDto) {

        Therapist therapistEntity = therapistMapper.fromLoginDto(loginDto);

        Therapist therapist = findTherapistByEmail(therapistEntity.getEmail());

        checkPassword(loginDto.getPassword(), therapist);

        //토큰 정보 헤더에 담기
        TokenInfo tokenInfo = tokenProvider.createToken(therapist);
        HttpHeaders httpHeaders = tokenProvider.setHttpHeaders(tokenInfo);

        return ResponseEntity.ok().headers(httpHeaders).body("치료사 로그인 성공");
    }


    @Transactional
    public ResponseEntity<?> signUp(TherapistSignUpDto therapistSignUpDto){

        //엔티티 매핑
        Therapist therapist = therapistMapper.fromTherapistSignUpDto(therapistSignUpDto);

        //이메일 중복 체크
        validateEmail(therapist);

        //비밀번호 엔코딩
        therapist.setPassword(passwordEncoder.encode(therapist.getPassword()));

        //권한 부여
        therapist.setRole(Role.ROLE_THERAPIST);

        // Center 처리 및 Enrol 생성
        processCenterAndEnrol(therapist, therapistSignUpDto.getCenterName());

        // Therapist 저장
        therapistRepository.save(therapist);

        return ResponseEntity.ok("치료사 회원가입 성공");
    }


    @Transactional
    public ResponseEntity<?> updateTherapist(TherapistSignUpDto therapistSignUpDto, UserPrinciple userDetails) {

        Therapist existingTherapist = findById(userDetails.getId());

        //update mapstruct
        therapistMapper.updateTherapistFromSignUpDto(therapistSignUpDto,existingTherapist);

        // 비밀번호가 변경된 경우에만 업데이트
        updatePasswordIfChanged(therapistSignUpDto, existingTherapist);

        therapistRepository.save(existingTherapist);

        return ResponseEntity.ok("치료사 정보 수정 성공");
    }

    @Transactional
    public ResponseEntity<?> deleteTherapist(UserPrinciple userDetails) {

        Therapist therapist = findById(userDetails.getId());

        therapistRepository.deleteById(therapist.getId());

        return ResponseEntity.ok("치료사 삭제 성공");
    }

    private void updatePasswordIfChanged(TherapistSignUpDto therapistSignUpDto, Therapist existingTherapist) {
        String newPassword = therapistSignUpDto.getPassword();
        if (newPassword != null && !newPassword.isEmpty()) {
            existingTherapist.setPassword(passwordEncoder.encode(newPassword));
        }
    }
    //사용자 권한 검증
    private void verifyTherapistOwnership(Therapist therapist, UserPrinciple userDetails) {
        if (!therapist.getId().equals(userDetails.getId())) {
            throw new CustomException(CustomCode.NOT_VALID_OWNER);
        }
    }
    private void processCenterAndEnrol(Therapist therapist, String centerName) {

        //프리랜서가 false면
        if (!therapist.isFreelancer()) {
            Center center = centerService.findCenterByName(centerName);

            //enrol 에 therapist, center 객체정보 저장 (외래키 자동저장 위해)
            Enrol enrol = Enrol.builder()
                    .center(center)
                    .therapist(therapist)
                    .build();
            enrolRepository.save(enrol);
        }
    }

    private void validateEmail(Therapist therapist) {
        if (therapistRepository.existsByEmail(therapist.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);
    }


    private void checkPassword(String password, Therapist therapist) {
        if (!passwordEncoder.matches(password, therapist.getPassword())) {
            throw new CustomException(CustomCode.NOT_VALID_PASSWORD);
        }
    }


    private Therapist findTherapistByEmail(String email) {
        return therapistRepository.findByEmail(email).orElseThrow(() -> {
            throw new CustomException(CustomCode.NOT_FOUND_THERAPIST);
        });
    }



    @Transactional(readOnly = true)
    public Therapist findById(Long Id) {
        return therapistRepository.findById(Id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_THERAPIST));
    }


}
