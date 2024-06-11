package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
    @Override
    Optional<User> findById(Long aLong);

    //SELECT * FROM user WHERE email = :email AND password = :password
    Optional<User> findByEmailAndPassword(String email, String password);

    //"SELECT COUNT(u) FROM User u WHERE u.email = :email"
    boolean existsByEmail(String email);

    //테스트 용  
    User findByEmail(String email);


}
