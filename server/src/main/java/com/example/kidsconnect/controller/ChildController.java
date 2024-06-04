package com.example.kidsconnect.controller;

import com.example.kidsconnect.dto.ChildDto;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import com.example.kidsconnect.service.ChildService;
import com.example.kidsconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/child") 

public class ChildController {

    @Autowired
    private ChildService childService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody ChildDto childDto){

        return childService.register(childDto);
    }
}
