package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long> {
}
