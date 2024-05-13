/*package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.ErrorCodeRepository;
import com.example.kidsconnect.domain.ErrorCode;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service

public class ErrorCodeService {

    private final ErrorCodeRepository errorCodeRepository;

    public ErrorCodeService(ErrorCodeRepository errorCodeRepository) {
        this.errorCodeRepository = errorCodeRepository;
    }


    public ErrorCode findByCode(String code) {
        return errorCodeRepository.findById(code).orElse(null);
    }
}
*/
