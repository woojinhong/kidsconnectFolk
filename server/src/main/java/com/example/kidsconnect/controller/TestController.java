package com.example.kidsconnect.controller;


import com.example.kidsconnect.dto.TherapistRequest;
import com.example.kidsconnect.dto.UserDtoRequest;
import com.example.kidsconnect.service.TestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final TestService ust;

    @PostMapping("/user")
    public ResponseEntity<?> loginAccount(@Valid UserDtoRequest userDtoRequest){

            return ust.loginUser(userDtoRequest);

    }
    @PostMapping("/therapist")
    public ResponseEntity<?> loginAccount(TherapistRequest therapistRequest){

        return ust.insertTherapist(therapistRequest);

    }



}
