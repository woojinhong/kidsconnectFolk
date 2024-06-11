package com.example.kidsconnect.service;

import com.example.kidsconnect.dao.TherapistReviewRepository;
import com.example.kidsconnect.domain.Therapist;
import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.domain.TherapistReview;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.ReservationResponseDto;
import com.example.kidsconnect.dto.ReviewDto;
import com.example.kidsconnect.mapping.ToEntity;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final TherapistReviewRepository reviewRepository;
    private final TherapistInfoService therapistInfoService;
    private final UserService userService;
    private final ToEntity toEntity;

    //치료사 리뷰 저장
    public ResponseEntity<?> addReview(Long therapistInfoId, ReviewDto reviewDTO, UserDetailImpl userDetail ) {

        // 엔티티 객체 사용하여 데이터베이스 조회
        TherapistInfo therapistInfo = therapistInfoService.findById(therapistInfoId);
        User user = userService.findById(userDetail.getId());

        // MapStruct를 사용하여 ReviewDto를 TherapistReview 엔티티로 변환
        TherapistReview review = toEntity.toTherapistReview(reviewDTO,therapistInfo,user);

        // 엔티티 객체를 데이터베이스에 저장
        reviewRepository.save(review);
        return ResponseEntity.ok("리뷰 추가 성공");
    }

    //리뷰 리스트 조회
    public ResponseEntity<?> getReviewsByTherapistId(Long therapistId) {
        return reviewRepository.findByTherapistId(therapistId);
    }
}
