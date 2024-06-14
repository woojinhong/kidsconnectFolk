package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.ChildRequestDto;
import com.example.kidsconnect.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<?> register(@RequestBody ChildRequestDto childRequestDto, @AuthenticationPrincipal UserPrinciple userDetails){

        return childService.register(childRequestDto,userDetails);
    }
}
