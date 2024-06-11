package com.example.kidsconnect.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.kidsconnect.dao.TherapistRepository;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.Loginable;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final TherapistRepository therapistRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Loginable loginable = userRepository.findByEmail(email);
        if (loginable == null) {
            loginable = therapistRepository.findByEmail(email);
        }
        
        if (loginable == null) {
            throw new CustomException(CustomCode.NOT_FOUND_MEMBER);
        }
        
//        System.out.println(loginable.email());
//        System.out.println(loginable.password());
//        System.out.println(loginable.role());
        
        return User.builder()        		
        		.username(loginable.email())
        		.password(loginable.password())
        		.authorities(loginable.role())
        		.build();
    }
    


}