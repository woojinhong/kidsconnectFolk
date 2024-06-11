package com.example.kidsconnect.config;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.kidsconnect.service.CustomUserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${spring.jwt.secret}")
    private String secretKey;
    
    
    private long tokenValidTime = 1000L * 60 * 60; // 토큰은 무한정으로 사용되면 안되기에 만료 시간 60분
    private long refreshTokenValidTime = 1000L * 60 * 60 * 24 * 7; // 7일
        
    private final CustomUserDetailsService userDetailsService;


//    @PostConstruct
//    protected void init() {
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//    }
    
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    /**
     * 토큰 생성 로직
     * @param email
     * @return
     */
    public String createToken(String email) { 
    	
    	Date now = new Date();
    	
        return Jwts.builder()
                .subject(email) // 토큰의 키가 되는 Subject를 중복되지 않는 고유한 값인 Email 로 지정한다.
                .issuedAt(now)
                .expiration(new Date(now.getTime() + tokenValidTime)) // 만료시간
                .signWith(this.getSigningKey())
                .compact();
        
//        return Jwts.builder()        		
//                .setClaims(claims)
//                .setIssuedAt(now)
//                .setExpiration(new Date(now.getTime() + tokenValidTime)) // 만료시간은 지금 시간으로부터 30분을 설정한다.
//                .signWith(SignatureAlgorithm.HS256, secretKey) // 서명할 때 사용되는 알고리즘은 HS256, 키는 위에서 지정한 값으로 진행한다.
//                .compact();
    }
    /**
     * 토큰 재발행
     * @return
     */
    public String createRefreshToken(String email) {    	
        Date now = new Date();
        
        return Jwts.builder()
        		.subject(email)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + refreshTokenValidTime)) // 만료시간
                .signWith(this.getSigningKey())
                .compact();
        
//        return Jwts.builder()        		
//                .setIssuedAt(now)
//                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
//                .signWith(SignatureAlgorithm.HS256, secretKey)
//                .compact();
    }
    
    /**
     * 토큰으로 인증 객체(Authentication)을 얻기 위한 메소드.
     * @param token
     * @return
     */
    public Authentication getAuthentication(String token) {
    	
    	System.out.println("hhh");
    	UserDetails userDetails = userDetailsService.loadUserByUsername(getEmail(token));
    	System.out.println("hhhz");
    	return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
            
    
    /**
     * ID를 얻기 위해 실제로 토큰을 디코딩하는 부분이다.
     * @param token
     * @return
     */
    public String getEmail(String token) {
        
    	Claims claims = Jwts.parser()
                .verifyWith(this.getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    	
    	String getEmail = claims.getSubject();
    	
    	return getEmail;
            
        
		
    }
    /**
     * 토큰을 사용하기 위해 실제로 Header에서 꺼내오는 메소드이다.
     * @param request
     * @return
     */
    public String resolveToken(HttpServletRequest request) {
    	
        return request.getHeader("Authorization");
    }
    
    /**
     * 토큰이 만료되었는 지를 확인해주는 메소드이다.
     * @param token
     * @return
     */
    public boolean validateTokenExceptExpiration(String token) {
        try {        	
        	        	        	        	
//            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            
            Claims claims = Jwts.parser()
            .verifyWith(this.getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
            
            // 이전과 같이 token을 디코딩하여 만료시간을 끌고와 현재시간과 비교해 확인해준다.
            return !claims.getExpiration().before(new Date()); 
        } catch(Exception e) {        	
            return false;
        }
    }
    
    /**
     * 리프레쉬토큰이 만료되었는 지를 확인해주는 메소드이다.
     * @param token
     * @return
     */
    public boolean validateRefreshTokenExceptExpiration(String token) {
        try {        	        	        	        	        	
        	
//            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            
            Claims claims = Jwts.parser()
                    .verifyWith(this.getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            
            return !claims.getExpiration().before(new Date()); // 이전과 같이 token을 디코딩하여 만료시간을 끌고와 현재시간과 비교해 확인해준다.
        } catch(Exception e) {
        	log.error("리프레쉬 토큰 확인 중 에러" , e);
            return false;
        }
    }    
    
    /**
     * 토큰을 만료시키는 메소드 토큰 기한을 1분전으로 만든다.
     * @param token
     */
    public void deleteToken(String token) throws Exception {
    	    	       	    	
//        String email = getEmail(token);
//        
//        redisTemplate.delete("accessToken_"+email);
//        redisTemplate.delete("refreshToken_"+email);
    	
        log.info("사용자 인증 토큰 , 리프레쉬 토큰 삭제 ");
    }
      
}
