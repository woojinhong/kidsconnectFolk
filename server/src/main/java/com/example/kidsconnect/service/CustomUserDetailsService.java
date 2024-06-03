package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistRepository;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.Loginable;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.CustomUserDetails;
import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

        return new CustomUserDetails(loginable);
    }
//        //DB에서 조회
//        User userData = userRepository.findByEmail(email);
//
//        if (userData != null) {
//
//            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
//            return new CustomUserDetails(userData);
//        }

//        return null;
//    }
}