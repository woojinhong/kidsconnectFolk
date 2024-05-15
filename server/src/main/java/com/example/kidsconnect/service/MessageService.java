package com.example.kidsconnect.service;


import com.example.kidsconnect.dto.Response;
import com.example.kidsconnect.message.ErrorCode;
import com.example.kidsconnect.message.SuccessCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Getter
public class MessageService {


    final private MessageSourceAccessor messageSourceAccessor ;

    public  Response getMessage(ErrorCode errorCode){

        final String code = errorCode.name();
        final String messgage = messageSourceAccessor.getMessage(errorCode.getValue());

        return Response.builder()
                        .code(code)
                        .message(messgage)
                        .build();
    }

    public  <T> Response<T> getMessage(ErrorCode errorCode, T detail) {
        final String code = errorCode.name();
        final String message = messageSourceAccessor.getMessage(errorCode.getValue());

        return Response.<T>builder()
                .code(code)
                .message(message)
                .detail(detail)
                .build();
    }


    public  Response getMessage(SuccessCode successCode){
        final String code = successCode.name();
        final String messgage = messageSourceAccessor.getMessage(successCode.getValue());

        return Response.builder().
                code(code).message(messgage).build();
    }


    public   <T> Response<T> getMessage(SuccessCode successCode, T detail) {
        final String code = successCode.name();
        final String message = messageSourceAccessor.getMessage(successCode.getValue());

        return Response.<T>builder()
                .code(code)
                .message(message)
                .detail(detail)
                .build();
    }


}
