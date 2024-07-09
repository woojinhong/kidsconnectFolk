package com.example.kidsconnect.dao;


import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.domain.TherapistReview;
import com.example.kidsconnect.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TherapistReviewRepository extends CrudRepository<TherapistReview,Long> {

    List<TherapistReview> findByUser(User user);

    List<TherapistReview> findByTherapistInfo(TherapistInfo therapistInfo);
}
