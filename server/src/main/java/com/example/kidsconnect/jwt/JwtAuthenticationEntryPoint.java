package com.example.kidsconnect.jwt;

import com.example.kidsconnect.jwt.dto.TokenValidationResult;
import com.example.kidsconnect.jwt.token.TokenStatus;
import com.example.kidsconnect.jwt.web.json.ApiResponseJson;
import com.example.kidsconnect.jwt.web.json.ResponseStatusCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import java.io.IOException;

import java.util.Map;


//인증 예외가 발생했을 때 사용되는 클래스입니다.

//request에 담긴 TokenValidationResult를 통해 토큰의 상태를 확인하고 상태에 맞는 응답을 전송합니다. (reqeust에 담긴 TokenValidationResult는 JwtFilter에서 담아줍니다.)

//TokenValidationResult를 통해 토큰의 상태를 확인하고 상태에 맞는 응답을 전송합니다.
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final String VALIDATION_RESULT_KEY = "result";
    private static final String ERROR_MESSAGE_KEY = "errMsg";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        TokenValidationResult result = (TokenValidationResult) request.getAttribute(VALIDATION_RESULT_KEY);
        String errorMessage = result.getTokenStatus().getMessage();
        int errorCode;

        switch (result.getTokenStatus()) {
            case TOKEN_EXPIRED -> errorCode = ResponseStatusCode.TOKEN_EXPIRED;
            case TOKEN_IS_BLACKLIST -> errorCode = ResponseStatusCode.TOKEN_IS_BLACKLIST;
            case TOKEN_WRONG_SIGNATURE -> errorCode = ResponseStatusCode.TOKEN_WRONG_SIGNATURE;
            case TOKEN_HASH_NOT_SUPPORTED -> errorCode = ResponseStatusCode.TOKEN_HASH_NOT_SUPPORTED;
            case WRONG_AUTH_HEADER -> errorCode = ResponseStatusCode.NO_AUTH_HEADER;
            default -> {
                errorMessage = TokenStatus.TOKEN_VALIDATION_TRY_FAILED.getMessage();
                errorCode = ResponseStatusCode.TOKEN_VALIDATION_TRY_FAILED;
            }
        }

        sendError(response, errorMessage, errorCode);
    }

    private void sendError(HttpServletResponse response, String msg, int code) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        ApiResponseJson responseJson = new ApiResponseJson(HttpStatus.valueOf(HttpServletResponse.SC_UNAUTHORIZED),
                code, Map.of(ERROR_MESSAGE_KEY, msg));

        String jsonToString = objectMapper.writeValueAsString(responseJson);
        response.getWriter().write(jsonToString);
    }
}
