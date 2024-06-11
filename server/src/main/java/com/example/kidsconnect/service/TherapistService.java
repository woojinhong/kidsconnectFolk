package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.*;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.LoginDto;

import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ToEntity;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository therapistRepository;

    private final CenterRepository centerRepository;
    private final EnrolRepository enrolRepository;

    private final PasswordEncoder passwordEncoder;



    private final ToEntity toEntity;

    public ResponseEntity<?> login(LoginDto loginDto){
        Therapist therapist = toEntity.fromTherapistLoginDto(loginDto);

        therapistRepository.findByEmailAndPassword(therapist.getEmail(), therapist.getPassword()).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        return ResponseEntity.ok("치료사 로그인 성공");

    }


    @Transactional
    public ResponseEntity<?> signUp(TherapistSignUpDto therapistSignUpDto){

        Therapist therapist = toEntity.fromTherapistSignUpDto(therapistSignUpDto);
//        Center center = toEntity.fromChildDtoToCenter(therapistSignUpDto);

        System.out.println("therapist = " + therapist);
//        System.out.println("center = " + center);

        if(therapistRepository.existsByEmail(therapist.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);

//        if(!therapist.isFreelancer()) {
//            center = centerRepository.findByName(center.getName())
//                    .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

            Enrol enrol = Enrol.builder()
     //               .therapist(therapist)
//                    .center(center)
                    .build();
            enrolRepository.save(enrol);


        therapist.setPassword(passwordEncoder.encode(therapist.getPassword()));
        therapist.setRole("ROLE_ADMIN");
        therapistRepository.save(therapist);

        return ResponseEntity.ok("치료사 회원가입 성공");
    }

    public Therapist findById(Long Id) {
        return therapistRepository.findById(Id)
                .orElseThrow(() -> new CustomException(CustomCode.NOT_FOUND_MEMBER));
    }


//    public ResponseEntity<List<Therapist>>  findTherapistsByCategories(List<String> categories) {
//
//        return ResponseEntity.ok("치료사 목록");
//    }
//
//    public ResponseEntity<List<Therapist>> findMatchedTherapists(MatchingRequestDto request) {
//        // 질문에 기반한 치료사 매칭 로직 구현
//        return ResponseEntity.ok("치료사 회원가입 성공");
//    }


        }

