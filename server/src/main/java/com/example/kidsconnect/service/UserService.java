package com.example.kidsconnect.service;

import com.example.kidsconnect.exception.UserNotFoundException;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User findUserByName(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user = optionalUser.orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
        return user;
    }



}
