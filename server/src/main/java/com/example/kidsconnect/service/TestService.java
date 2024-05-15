package com.example.kidsconnect.service;


import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.Response;
import com.example.kidsconnect.dto.UserDto;
import com.example.kidsconnect.dto.UserDtoRequest;
import com.example.kidsconnect.exception.UserNotFoundException;
import com.example.kidsconnect.message.ErrorCode;
import com.example.kidsconnect.message.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.kidsconnect.message.SuccessCode;


@RequiredArgsConstructor
@Service
public class UserServiceTest {

    private final UserRepository userRepository;

    private final MessageService msg;


    public ResponseEntity<?> registerUser(UserDtoRequest userDtoRequest){
            User user= userRepository.findByEmailAndPassword(userDtoRequest.getEmail(),userDtoRequest.getPassword());

            Response response;

            if(user==null){
                throw new UserNotFoundException();
//                response= msg.getMessage(ErrorCode.ERROR_USER_LOGIN);
//                return ResponseEntity.badRequest().body(response);
            }

            response=msg.getMessage(SuccessCode.SUCCESS_USER_LOGIN);
            return ResponseEntity.ok(response);

    }


}
