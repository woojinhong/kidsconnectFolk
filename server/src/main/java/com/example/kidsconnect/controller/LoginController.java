package com.example.kidsconnect.controller;


import com.example.kidsconnect.dto.UserDto;
import com.example.kidsconnect.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class LoginController {

    @Autowired
    private LoginService loginService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto loginCheck) throws Exception {
        return loginService.loginCheck(loginCheck.getEmail(),loginCheck.getPassword());
    }
}