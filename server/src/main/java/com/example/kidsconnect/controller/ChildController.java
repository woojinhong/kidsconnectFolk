package com.example.kidsconnect.controller;

import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.ChildRequestDto;
import com.example.kidsconnect.dto.ChildResponseDto;
import com.example.kidsconnect.dto.MatchResponseDto;
import com.example.kidsconnect.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/child") 

public class ChildController {

    @Autowired
    private ChildService childService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody ChildRequestDto childRequestDto, @AuthenticationPrincipal UserPrinciple userDetails){

        return childService.register(childRequestDto,userDetails);
    }

    @DeleteMapping("/{childId}")
    public ResponseEntity<?> deleteChild(@PathVariable Long childId) {
        return childService.deleteChild(childId);
    }

    @PutMapping("/{childId}")
    public ResponseEntity<?> updateChild(@PathVariable Long childId, @RequestBody ChildRequestDto childRequestDto) {
        return childService.updateChild(childId, childRequestDto);
    }

    @GetMapping()
    public List<ChildResponseDto> showChildren(@AuthenticationPrincipal UserPrinciple userDetails) {
        System.out.println("userDetails.getId() = " + userDetails.getId());
        return childService.getChildrenByUserId(userDetails.getId());
    }
}
