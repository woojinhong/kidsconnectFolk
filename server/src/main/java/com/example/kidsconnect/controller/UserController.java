package com.example.kidsconnect.controller;


import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.LoginDto;
import com.example.kidsconnect.dto.UserSignUpDto;
import com.example.kidsconnect.service.UserService;
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

    //아이 조회
//    @GetMapping("/{userId}/children")
//    public ResponseEntity<List<Child>> getChildrenByUserId(@PathVariable Long userId) {
//        List<Child> children = userService.getChildrenByUserId(userId);
//        return ResponseEntity.ok(children);
//    }

    // 부모 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId,
                                        @AuthenticationPrincipal UserPrinciple userDetails) {

        return userService.deleteUser(userId, userDetails);
    }

    // 부모 업데이트
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId,
                                        @RequestBody UserSignUpDto userSignUpDto,
                                        @AuthenticationPrincipal UserPrinciple userDetails) {
        return userService.updateUser(userId, userSignUpDto, userDetails);
    }
}