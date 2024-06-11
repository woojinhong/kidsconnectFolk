package com.example.kidsconnect.controller;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.service.TherapistInfoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/therapist/info")
@RequiredArgsConstructor
public class TherapistInfoController {

    private final TherapistInfoService therapistInfoService;

    @GetMapping("/{id}")
    public ResponseEntity<?> showTherapistInfo(@PathVariable Long id){
        return therapistInfoService.showTherapistInfo(id);
    }
    @PostMapping()
    public ResponseEntity<?> createTherapistInfo(@RequestBody TherapistInfoDto therapistInfoDto) {

        return therapistInfoService.addTherapistInfo(therapistInfoDto);
    }


    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTherapistInfo(@PathVariable Long id, @RequestBody TherapistInfoDto therapistInfoDto) {
        return therapistInfoService.updateTherapistInfo(id, therapistInfoDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTherapistInfo(@PathVariable Long id) {

        return therapistInfoService.deleteTherapistInfo(id);
    }

}
