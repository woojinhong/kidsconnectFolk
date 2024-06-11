package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Child;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChildRepository extends CrudRepository<Child,Long> {

    Child findByLastName(String lastName);

    List<Child> findByUserId(Long userId);
}
