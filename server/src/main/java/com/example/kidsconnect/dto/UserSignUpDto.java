package com.example.kidsconnect.dto;

import com.example.kidsconnect.mapping.ToEntity;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@ToString
public class UserSignUpDto {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNum;
    private String postalCode;
    private String addressDetail;
    private String address;


}
