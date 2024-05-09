package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Child;
import org.springframework.data.repository.CrudRepository;

public interface ChildRepository extends CrudRepository<Child,Long> {
}
