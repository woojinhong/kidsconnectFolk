package com.example.kidsconnect;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class KidsconnectApplication implements CommandLineRunner {
    @Autowired
    EntityManagerFactory emf;

    public static void main(String[] args) {
        SpringApplication.run(KidsconnectApplication.class, args);
    }

    @GetMapping("/hi")
    public String hello(){
        return "hello kids connect1";
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("emf = " + emf);
    }
}
