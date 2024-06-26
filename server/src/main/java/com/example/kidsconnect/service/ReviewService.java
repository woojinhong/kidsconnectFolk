package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistReviewRepository;
import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ReviewDto;
import com.example.kidsconnect.mapping.ReviewMapper;
import com.example.kidsconnect.mapping.ToEntity;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ReviewService {
    private final TherapistReviewRepository reviewRepository;
    private final TherapistInfoService therapistInfoService;
    private final UserService userService;
    private final ReviewMapper reviewMapper;

    //치료사 리뷰 저장
    public ResponseEntity<?> addReview(Long therapistInfoId, ReviewDto reviewDTO, UserPrinciple userDetail) {

        // 엔티티 객체 사용하여 데이터베이스 조회
        TherapistInfo therapistInfo = therapistInfoService.findById(therapistInfoId);
        User user = userService.findById(userDetail.getId());

        // MapStruct를 사용하여 ReviewDto를 TherapistReview 엔티티로 변환
        TherapistReview review = reviewMapper.toTherapistReview(reviewDTO,therapistInfo,user);

        // 엔티티 객체를 데이터베이스에 저장
        reviewRepository.save(review);
        return ResponseEntity.ok("리뷰 추가 성공");
    }

    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsByUser(UserPrinciple userDetails) {
        User user = userService.findById(userDetails.getId());
        List<TherapistReview> reviews = reviewRepository.findByUser(user);

        return reviewMapper.toReviewDtoList(reviews);
    }

    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsByTherapist(UserPrinciple userDetails) {
        TherapistInfo therapistInfo = therapistInfoService.findByTherapistId(userDetails.getId());
        List<TherapistReview> reviews = reviewRepository.findByTherapistInfo(therapistInfo);

        return reviewMapper.toReviewDtoList(reviews);
    }
}
