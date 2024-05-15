package com.example.kidsconnect.service;


import com.example.kidsconnect.dao.TherapistRepository;
import com.example.kidsconnect.dao.UserRepository;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.Response;
import com.example.kidsconnect.dto.TherapistRequest;
import com.example.kidsconnect.dto.UserDtoRequest;
import com.example.kidsconnect.exception.UserNotFoundException;
import com.example.kidsconnect.mapping.TherapistMapper;
import com.example.kidsconnect.message.ErrorCode;
import com.example.kidsconnect.message.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class TestService {

    private final UserRepository userRepository;
    private final TherapistRepository therapistRepository;
    private final MessageService msg;

    private final TherapistMapper therapistMapper = Mappers.getMapper(TherapistMapper.class);

    public ResponseEntity<?> loginUser(UserDtoRequest userDtoRequest){
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


    public ResponseEntity<?> insertTherapist(TherapistRequest therapistRequest){

        Therapist therapist = therapistMapper.toTherapist(therapistRequest);

        try {
            therapist = therapistRepository.save(therapist);
            if (therapist == null) {
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(msg.getMessage(ErrorCode.ERROR_DB_REGISTRATION));
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(msg.getMessage(SuccessCode.CREATED_THERAPIST));

        } catch (IllegalArgumentException e) {
             throw e; // GlobalExceptionHandler에서 처리할 수도 있음
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(msg.getMessage(ErrorCode.ERROR_DB_REGISTRATION));
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
