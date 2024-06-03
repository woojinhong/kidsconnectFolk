package com.example.kidsconnect.dto;

import com.example.kidsconnect.domain.Loginable;
import com.example.kidsconnect.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;


public class CustomUserDetails implements UserDetails {

    private final Loginable loginable;

    public CustomUserDetails(Loginable loginable) {

        this.loginable = loginable;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return loginable.role();
            }
        });

        System.out.println("collection = " + collection);
        System.out.println("loginable.email()+loginable.password() = " + loginable.email()+loginable.password());
        return collection;
    }

    @Override
    public String getPassword() {

        return loginable.password();
    }

    @Override
    public String getUsername() {

        return loginable.email();
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}