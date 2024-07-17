package com.example.kidsconnect.jwt.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString(exclude = {"accessToken"})
public class TokenInfo {

    private String accessToken;

//    private String refreshToken;
    private Date accessTokenExpireTime;
    private String ownerEmail;
    private String tokenId;

    @Builder
    public TokenInfo(String accessToken,String refreshToken, Date accessTokenExpireTime, String ownerEmail, String tokenId) {
        this.accessToken = accessToken;
//        this.refreshToken = refreshToken;
        this.accessTokenExpireTime = accessTokenExpireTime;
        this.ownerEmail = ownerEmail;
        this.tokenId = tokenId;
    }

}
