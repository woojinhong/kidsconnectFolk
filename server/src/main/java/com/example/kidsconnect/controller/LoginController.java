package com.example.kidsconnect.controller;

import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/users")
//    public ResponseEntity<List<User>> getUsers() {
//        List<User> users = userRepository.findAll();
//        return ResponseEntity.ok().body(users);
//    }
}