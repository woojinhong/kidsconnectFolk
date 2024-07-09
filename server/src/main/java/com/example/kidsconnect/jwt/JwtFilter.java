package com.example.kidsconnect.jwt;

import com.example.kidsconnect.jwt.dto.TokenValidationResult;
import com.example.kidsconnect.jwt.token.TokenStatus;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.regex.Pattern;

//이전에 설명한 JWT를 통한 인증을 위한 필터로 한 번만 사용되도록 OncePerRequestFilter를 상속받아 필터를 만듭니다.
//필터를 등록하기 위해 @Component 어노테이션을 추가합니다.
//http request의 Authorization 헤더에서 토큰을 추출하고, 추출한 토큰을 검증합니다.
//토큰은 Bearer로 시작하는 문자열이어야 하며, .으로 구분된 3개의 문자열로 구성되어야 합니다.
//토큰이 유효하면 SecurityContextHolder에 Authentication을 설정합니다.
//토큰이 유효하지 않으면 TokenValidationResult를 request에 담아 JwtAuthenticationEntryPoint에 전달합니다. (이후 JwtAuthenticationEntryPoint에서 이를 이용해 상황에 맞는 응답을 전송합니다.)
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_REGEX = "Bearer ([a-zA-Z0-9_\\-\\+\\/=]+)\\.([a-zA-Z0-9_\\-\\+\\/=]+)\\.([a-zA-Z0-9_.\\-\\+\\/=]*)";
    private static final Pattern BEARER_PATTERN = Pattern.compile(BEARER_REGEX);
    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = resolveToken(request);

        // JWT 토큰 예외 구분 처리를 위해 request에 tokenValidationResult를 담아 EntryPoint에 전달합니다.
        // Authorization 헤더가 없는 경우
        if (!StringUtils.hasText(token)) {
            handleMissingToken(request, response, filterChain);
            return;
        }

        TokenValidationResult tokenValidationResult = tokenProvider.validateToken(token);

        // 잘못된 토큰일 경우
        if (!tokenValidationResult.isValid()) {
            handleWrongToken(request, response, filterChain, tokenValidationResult);
            return;
        }

        // 정상적인 토큰인 경우 SecurityContext에 Authentication 설정
        handleValidToken(token, tokenValidationResult.getClaims());
        filterChain.doFilter(request, response);
    }

    private void handleValidToken(String token, Claims claims) {
        Authentication authentication = tokenProvider.getAuthentication(token, claims);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("AUTH SUCCESS : {},", authentication.getName());
    }

    private void handleWrongToken(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain,
                                  TokenValidationResult tokenValidationResult) throws IOException, ServletException {
        request.setAttribute("result", tokenValidationResult);
        filterChain.doFilter(request, response);
    }

    private void handleMissingToken(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        request.setAttribute("result",
                new TokenValidationResult(TokenStatus.WRONG_AUTH_HEADER, null, null, null)
        );
        filterChain.doFilter(request, response);
    }

    // Request Header에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (bearerToken != null && BEARER_PATTERN.matcher(bearerToken).matches()) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
