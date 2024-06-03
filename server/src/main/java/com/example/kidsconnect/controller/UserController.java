package com.example.kidsconnect.controller;


import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        System.out.println("Received login request with email: " + loginDto.getEmail());
        return userService.login(loginDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserSignUpDto userSignUpDto){

        System.out.println("userSignUpDto = " + userSignUpDto);
        return userService.signUp(userSignUpDto);
    }
}