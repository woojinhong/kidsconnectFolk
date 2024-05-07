package com.example.kidsconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class KidsconnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(KidsconnectApplication.class, args);
    }

    @GetMapping("/hi")
    public String hello(){
        return "hello kids connect1";
    }
}
