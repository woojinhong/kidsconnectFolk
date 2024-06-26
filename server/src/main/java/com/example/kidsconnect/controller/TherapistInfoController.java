package com.example.kidsconnect.controller;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.service.TherapistInfoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/therapist/info")
@RequiredArgsConstructor
public class TherapistInfoController {

    private final TherapistInfoService therapistInfoService;

    @GetMapping()
    public ResponseEntity<?> showTherapistInfo(@AuthenticationPrincipal UserPrinciple userDetails){
        return therapistInfoService.showTherapistInfo(userDetails);
    }
    @PostMapping()
    public ResponseEntity<?> createTherapistInfo(@RequestBody TherapistInfoDto therapistInfoDto, @AuthenticationPrincipal UserPrinciple userDetails) {

        return therapistInfoService.addTherapistInfo(therapistInfoDto, userDetails);
    }


    @PatchMapping()
    public ResponseEntity<?> updateTherapistInfo(@RequestBody TherapistInfoDto therapistInfoDto,@AuthenticationPrincipal UserPrinciple userDetails) {
        return therapistInfoService.updateTherapistInfo(therapistInfoDto, userDetails);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteTherapistInfo(@AuthenticationPrincipal UserPrinciple userDetails) {

        return therapistInfoService.deleteTherapistInfo(userDetails);
    }

}
