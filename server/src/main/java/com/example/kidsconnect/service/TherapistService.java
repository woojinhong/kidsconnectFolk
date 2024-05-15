package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistRepository;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import com.example.kidsconnect.mapping.ToEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TherapistService {
    @Autowired
    TherapistRepository therapistRepository;
    @Autowired
    ToEntity toEntity;

    public ResponseEntity<String> login(LoginDto loginDto){
        Therapist therapist = toEntity.fromTherapistLoginDto(loginDto);

        therapistRepository.findByEmailAndPassword(therapist.getEmail(), therapist.getPassword()).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_MEMBER));

        return ResponseEntity.ok("환영합니다 "+ loginDto.getEmail() +"님아");

    }


    public ResponseEntity<String> signUp(TherapistSignUpDto therapistSignUpDto){
        Therapist therapist = toEntity.fromTherapistSignUpDto(therapistSignUpDto);
        if(therapistRepository.existsByEmail(therapist.getEmail()))
            throw new CustomException(CustomCode.DUPLICATED_EMAIL);

        therapistRepository.save(therapist);

        return ResponseEntity.ok("가입 축하드립니다 "+therapistSignUpDto.getFirstName()+"님!!");
    }
}
