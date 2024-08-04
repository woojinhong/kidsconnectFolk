package com.example.kidsconnect.config;


import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@Profile("test")
@EnableJpaRepositories(basePackages = {
        "com.example.kidsconnect.dao",
})
@EntityScan(basePackages = {
        "com.example.kidsconnect.domain",
        "com.example.kidsconnect.domain.test"
})
public class TestConfig {
}