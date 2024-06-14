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

    @GetMapping("/{therapistId}")
    public ResponseEntity<?> showTherapistInfo(@PathVariable Long therapistId){
        return therapistInfoService.showTherapistInfo(therapistId);
    }
    @PostMapping()
    public ResponseEntity<?> createTherapistInfo(@RequestBody TherapistInfoDto therapistInfoDto, @AuthenticationPrincipal UserPrinciple userDetails) {

        return therapistInfoService.addTherapistInfo(therapistInfoDto, userDetails);
    }


    @PatchMapping("/{therapistInfoId}")
    public ResponseEntity<?> updateTherapistInfo(@PathVariable Long therapistInfoId, @RequestBody TherapistInfoDto therapistInfoDto,@AuthenticationPrincipal UserPrinciple userDetails) {
        return therapistInfoService.updateTherapistInfo(therapistInfoId, therapistInfoDto, userDetails);
    }

    @DeleteMapping("/{therapistInfoId}")
    public ResponseEntity<?> deleteTherapistInfo(@PathVariable Long therapistInfoId, @AuthenticationPrincipal UserPrinciple userDetails) {

        return therapistInfoService.deleteTherapistInfo(therapistInfoId,userDetails);
    }

}
