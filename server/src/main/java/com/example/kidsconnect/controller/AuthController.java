package com.example.kidsconnect.controller;

import com.example.kidsconnect.dao.TherapistRepository;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.service.TherapistService;
import com.example.kidsconnect.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final TherapistService therapistService;
    private final UserService userService;
    @PostMapping("/login/therapist")
    public ResponseEntity<?> therapistLogin(@RequestBody LoginDto loginDto) {
        logger.info("Received login request with email: {}", loginDto.getEmail());
            return therapistService.login(loginDto);
    }

    @PostMapping("/login/user")
    public ResponseEntity<?> userLogin(@RequestBody LoginDto loginDto) {
        System.out.println("loginDto = " + loginDto);
        logger.info("Received login request with email: {}", loginDto.getEmail());
        return userService.login(loginDto);
    }

    @PostMapping("/signup/therapist")
    public ResponseEntity<?> therapistSignUp(@RequestBody TherapistSignUpDto therapistSignUpDto) {
        return therapistService.signUp(therapistSignUpDto);
    }

    @PostMapping("/signup/user")
    public ResponseEntity<?> userSignUp(@RequestBody UserSignUpDto userSignUpDto) {

        return userService.signUp(userSignUpDto);
    }
}
