package com.example.kidsconnect.domain;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@ToString
public class UserPrinciple extends User {

    private static final String PASSWORD_ERASED_VALUE="[PASSWORD_ERASED]";

    private final String email;
    private final Long id;
    public UserPrinciple(Long id,String email, String username,
                              Collection<? extends GrantedAuthority> authorities) {
        super(username, PASSWORD_ERASED_VALUE, authorities);
        this.id = id;
        this.email=email;
    }
}