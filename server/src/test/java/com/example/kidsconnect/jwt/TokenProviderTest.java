package com.example.kidsconnect.jwt;

import com.example.kidsconnect.domain.Role;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.jwt.dto.TokenInfo;
import com.example.kidsconnect.jwt.dto.TokenValidationResult;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
class TokenProviderTest {

    // 512 byte 이상의 key를 생성
    private final String secrete = "dGhpcyBpcyBteSBoaWRkZW4gand0IHNlY3JldGUga2V5LCB3aGF0IGlzIHlvdXIgand0IHNlY3JldGUga2V5Pw==";
    private final Long accessTokenValidTimeInSeconds = 3L;
    private final TokenProvider tokenProvider = new TokenProvider(secrete, accessTokenValidTimeInSeconds);

    @Test
    void createToken() {
        User user = getUser();

        TokenInfo token = tokenProvider.createToken(user);
        log.info("access token=>{}", token.getAccessToken());
    }

    @Test
    void validateTokenValid() {
        User user = getUser();
        TokenInfo token = tokenProvider.createToken(user);
        String accessToken = token.getAccessToken();

        TokenValidationResult tokenValidationResult = tokenProvider.validateToken(accessToken);

        Assertions.assertThat(tokenValidationResult.isValid()).isTrue();
    }

    @Test
    void validateTokenNotValid() throws InterruptedException {
        User user = getUser();
        TokenInfo token = tokenProvider.createToken(user);
        String accessToken = token.getAccessToken();

        Thread.sleep(4000);
        TokenValidationResult tokenValidationResult = tokenProvider.validateToken(accessToken);

        Assertions.assertThat(tokenValidationResult.isValid()).isFalse();
    }

    private User getUser() {
        return User.builder()
                .email("opensw@ajou.ac.kr")
                .password("1234")
                .firstName("bandall")
                .lastName("example")
                .role(Role.ROLE_USER)
                .build();
    }

    private Therapist getTherapist() {
        return Therapist.builder()
                .email("therapist@ajou.ac.kr")
                .password("5678")
                .firstName("Thera")
                .lastName("Pist")
                .role(Role.ROLE_THERAPIST)
                .build();
    }
}
