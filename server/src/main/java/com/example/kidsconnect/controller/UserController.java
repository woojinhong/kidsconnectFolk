package com.example.kidsconnect.controller;


import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserResponseDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping()
    public UserResponseDto showUser(@AuthenticationPrincipal UserPrinciple userDetails) {
        return userService.showUser(userDetails);
    }
    // 부모 삭제
    @DeleteMapping()
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserPrinciple userDetails) {

        return userService.deleteUser(userDetails);
    }

    // 부모 업데이트
    @PutMapping()
    public ResponseEntity<?> updateUser(@RequestBody UserSignUpDto userSignUpDto,
                                        @AuthenticationPrincipal UserPrinciple userDetails) {
        return userService.updateUser(userSignUpDto, userDetails);
    }
}