package com.example.kidsconnect.config;

import com.example.kidsconnect.jwt.JwtAccessDeniedHandler;
import com.example.kidsconnect.jwt.JwtAuthenticationEntryPoint;
import com.example.kidsconnect.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

//SecurityFilterChain을 생성해줍니다.

//csrf와 formLogin을 비활성화합니다.

//exceptionHandling을 통해 인증 예외와 인가 예외를 처리할 클래스를 등록합니다. (인증 예외는 JwtAuthenticationEntryPoint, 인가 예외는 JwtAccessDeniedHandler)

//sessionManagement를 통해 세션을 사용하지 않도록 설정합니다.

//authorizeHttpRequests를 통해 요청 경로에 따른 대한 인가를 설정합니다. (회원가입 API는 로그인 전에만 사용할 수 있도록 anonymous로 설정합니다.)

//addFilterBefore를 통해 JwtFilter를 UsernamePasswordAuthenticationFilter 앞에 등록합니다.
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtFilter jwtFilter;
    private final String[] adminUrl = {"/api/v1/login/admin"};
    private final String[] therapistUrl = {"/api/v1/therapist/**"};
    private final String[] userUrl = {"/api/v1/review/**", "/api/v1/child/**"};
    private final String[] permitAllUrl = {"/**"};
    private final String[] anonymousUrl = {"/api/v1/auth/signup/**"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(handle -> handle
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(adminUrl).hasAnyRole("ADMIN")
                        .requestMatchers(permitAllUrl).permitAll()
                        .requestMatchers(anonymousUrl).anonymous()
                        .requestMatchers(therapistUrl).hasRole("THERAPIST")
                        .requestMatchers(userUrl).hasRole("USER")
                        .anyRequest().authenticated()
                )

                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OidcUserService oidcUserService() {
        return new OidcUserService();
    }
}
