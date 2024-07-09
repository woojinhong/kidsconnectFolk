package com.example.kidsconnect.jwt;

import com.example.kidsconnect.domain.Loginable;
import com.example.kidsconnect.domain.UserPrinciple;
import com.example.kidsconnect.jwt.dto.TokenInfo;
import com.example.kidsconnect.jwt.dto.TokenValidationResult;
import com.example.kidsconnect.jwt.token.TokenStatus;
import com.example.kidsconnect.jwt.token.TokenType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String TOKEN_ID_KEY = "tokenId";
    private static final String USERNAME_KEY = "username";
    private static final String USER_ID_KEY = "id"; // 추가된 부분

    private final Key hashKey;
    private final long accessTokenValidationInMilliseconds;

    public TokenProvider(String secrete, long accessTokenValidationInSeconds) {
        byte[] keyBytes = Decoders.BASE64.decode(secrete);
        this.hashKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenValidationInMilliseconds = accessTokenValidationInSeconds * 1000;
    }

    public TokenInfo createToken(Loginable loginable) {
        long currentTime = (new Date()).getTime();
        Date accessTokenExpireTime = new Date(currentTime + this.accessTokenValidationInMilliseconds);
        String tokenId = UUID.randomUUID().toString();

        // Access 토큰
        String accessToken = Jwts.builder()
                .setSubject(loginable.email())
                .claim(AUTHORITIES_KEY, loginable.role().name())  // Assuming role() returns an Enum
                .claim(USERNAME_KEY, loginable.email())  // Assuming username is the email for simplicity
                .claim(USER_ID_KEY, loginable.id())  // 추가된 부분
                .claim(TOKEN_ID_KEY, tokenId)
                .signWith(hashKey, SignatureAlgorithm.HS512)
                .setExpiration(accessTokenExpireTime)
                .compact();

        // Refresh 토큰 (생성 로직 추가)
//        String refreshToken = Jwts.builder()
//                .setSubject(loginable.email())
//                .claim(TOKEN_ID_KEY, tokenId)
//                .signWith(hashKey, SignatureAlgorithm.HS512)
//                .compact();

        return TokenInfo.builder()
                .ownerEmail(loginable.email())
                .tokenId(tokenId)
                .accessToken(accessToken)
//                .refreshToken(refreshToken)
                .accessTokenExpireTime(accessTokenExpireTime)
                .build();
    }


    public TokenValidationResult validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(hashKey).build().parseClaimsJws(token).getBody();
            return new TokenValidationResult(TokenStatus.TOKEN_VALID, TokenType.ACCESS,
                    claims.get(TOKEN_ID_KEY, String.class),
                    claims);
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰");
            return getExpiredTokenValidationResult(e);
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명");
            return new TokenValidationResult(TokenStatus.TOKEN_WRONG_SIGNATURE, null, null, null);
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 서명");
            return new TokenValidationResult(TokenStatus.TOKEN_HASH_NOT_SUPPORTED, null, null, null);
        } catch (IllegalArgumentException e) {
            log.info("잘못된 JWT 토큰");
            return new TokenValidationResult(TokenStatus.TOKEN_WRONG_SIGNATURE, null, null, null);
        }
    }

    private TokenValidationResult getExpiredTokenValidationResult(ExpiredJwtException e) {
        Claims claims = e.getClaims();
        return new TokenValidationResult(TokenStatus.TOKEN_EXPIRED, TokenType.ACCESS,
                claims.get(TOKEN_ID_KEY, String.class), null);
    }

    // access 토큰과 claim을 전달받아 UsernamePasswordAuthenticationToken을 생성해 전달
    public Authentication getAuthentication(String token, Claims claims) {
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        Long id = claims.get(USER_ID_KEY, Long.class); // 추가된 부분

        // 커스텀한 UserPrinciple 객체 사용 -> 이후 추가적인 데이터를 토큰에 넣을 경우 UserPrinciple 객체 및 이 클래스의 함수들 수정 필요
        UserPrinciple principle = new UserPrinciple(id,claims.getSubject(), claims.get(USERNAME_KEY, String.class),
                authorities);

        return new UsernamePasswordAuthenticationToken(principle, token, authorities);
    }

    public HttpHeaders setHttpHeaders(TokenInfo tokenInfo) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer " + tokenInfo.getAccessToken());
        httpHeaders.set("Access-Control-Expose-Headers", "Authorization"); 
        return httpHeaders;
    }

//    public HttpHeaders setHttpHeaders(TokenInfo tokenInfo) {
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.set("Authorization", "Bearer " + tokenInfo.getAccessToken());
//        httpHeaders.set("RefreshToken", tokenInfo.getRefreshToken()); // RefreshToken 추가
//        httpHeaders.set("Access-Token-Expire-Time", String.valueOf(tokenInfo.getAccessTokenExpireTime().getTime())); // Expire Time 추가
//        return httpHeaders;
//    }


}

