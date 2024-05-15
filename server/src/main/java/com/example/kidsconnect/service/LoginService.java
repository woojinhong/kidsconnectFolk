package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.UserDto;
import com.example.kidsconnect.mapping.UserMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    public ResponseEntity<String> loginCheck(String email, String password) throws UnsupportedEncodingException {
        if (isValid(email, password)) {
            return ResponseEntity.ok("Welcome " + email);
        } else {
            String msg = URLEncoder.encode("id 또는 pwd가 일치하지 않습니다.", "utf-8");
            return ResponseEntity.badRequest().body(msg);
        }
    }

    private boolean isValid(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user != null) {
            UserDto userDto = userMapper.toUserDTO(user);
            return password.equals(userDto.getPassword());
        }
        return false;
    }
}
