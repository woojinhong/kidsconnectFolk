package com.example.kidsconnect.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter  {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    	
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request); // 헤더에서 토큰을 추출한다.

        if (token != null && jwtTokenProvider.validateTokenExceptExpiration(token)) { // 토큰이 존재하는지 확인하고 존재한다면 만료시간이 지나지 않았는지 확인한다.
            Authentication auth = jwtTokenProvider.getAuthentication(token);
            
            SecurityContextHolder.getContext().setAuthentication(auth); // 성공했다면, 인증 객체를 받아오고 SecurityContextHolder에 저장하여 인증을 할 수 있도록 한다.
           
            System.out.println(SecurityContextHolder.getContext().getAuthentication());
            
        } 
        filterChain.doFilter(request, response);
    }
}


