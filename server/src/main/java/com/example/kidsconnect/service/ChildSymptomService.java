package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ChildSymptomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ChildSymptomService {

    private final ChildSymptomRepository childSymptomRepository;


}
