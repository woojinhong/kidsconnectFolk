package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.Child;
import com.example.kidsconnect.dto.ChildResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChildRepository extends JpaRepository<Child,Long> {

    Child findByLastName(String lastName);


    List<Child> findByUserId(Long userId);

}
