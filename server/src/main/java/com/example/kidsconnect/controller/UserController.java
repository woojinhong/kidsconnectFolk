package com.example.kidsconnect.controller;


import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}/children")
    public ResponseEntity<List<Child>> getChildrenByUserId(@PathVariable Long userId) {
        List<Child> children = userService.getChildrenByUserId(userId);
        return ResponseEntity.ok(children);
    }

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