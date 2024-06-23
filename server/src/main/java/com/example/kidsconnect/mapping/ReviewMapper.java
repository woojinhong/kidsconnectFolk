package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.domain.TherapistReview;
import com.example.kidsconnect.domain.User;
import com.example.kidsconnect.dto.ReviewDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inDate", ignore = true)
    @Mapping(target = "upDate", ignore = true)
    @Mapping(target = "therapistInfo", source = "therapistInfo")
    @Mapping(target = "user", source = "user")
    TherapistReview toTherapistReview(ReviewDto reviewDTO, TherapistInfo therapistInfo, User user);



    List<ReviewDto> toReviewDtoList(List<TherapistReview> therapistReviews);
}

