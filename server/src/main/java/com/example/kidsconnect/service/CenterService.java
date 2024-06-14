package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.CenterRepository;
import com.example.kidsconnect.domain.Center;

import com.example.kidsconnect.exception.CustomCode;
import com.example.kidsconnect.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@RequiredArgsConstructor
public class CenterService {

    private final CenterRepository centerRepository;


    @Transactional
    public void save(Center center) {
        centerRepository.save(center);
    }

    @Transactional(readOnly = true)
    public Center findCenterByName(String centerName) {
        return centerRepository.findByName(centerName).orElseThrow(
                () -> new CustomException(CustomCode.NOT_FOUND_CENTER));
    }
}
