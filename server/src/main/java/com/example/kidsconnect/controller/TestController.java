package com.example.kidsconnect.testcontroller;


import com.example.kidsconnect.dto.UserDto;
import com.example.kidsconnect.dto.UserDtoRequest;
import com.example.kidsconnect.service.UserServiceTest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test/user")
public class AccountController {

    private final UserServiceTest ust;

    @PostMapping
    public ResponseEntity<?> loginAccount(@Valid UserDtoRequest userDtoRequest){

            return ust.registerUser(userDtoRequest);

    }

}
