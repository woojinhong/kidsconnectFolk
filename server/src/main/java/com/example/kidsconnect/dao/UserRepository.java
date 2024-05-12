package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long> {
    //SELECT * FROM user WHERE email = :email AND password = :password
    User findByEmailAndPassword(String email, String password);


}
