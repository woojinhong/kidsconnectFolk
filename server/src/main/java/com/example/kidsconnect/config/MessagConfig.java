package com.example.kidsconnect.config;

import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessagConfig {


    private final MessageSource messageSource;



    @Bean
    public MessageSourceAccessor initialize(){

        return new MessageSourceAccessor(messageSource);
    }
}
