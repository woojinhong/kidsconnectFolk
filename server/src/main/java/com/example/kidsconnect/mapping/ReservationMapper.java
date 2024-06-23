package com.example.kidsconnect.mapping;


import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ReservationRequestDto;
import com.example.kidsconnect.dto.ReservationResponseDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import com.example.kidsconnect.dto.UserReservationDto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true), // ID는 자동 생성되므로 무시
            @Mapping(target = "user", source = "user"),
            @Mapping(target = "child", source = "child"),
            @Mapping(target = "therapistInfo", source = "therapistInfo"),
            @Mapping(target = "addressDetail", source = "addressDetail"),
            @Mapping(target = "status", constant = "PENDING"),
            @Mapping(target = "inDate", ignore = true), // 생성 시점 설정
            @Mapping(target = "upDate", ignore = true)  // 업데이트 시점 설정
    })
    Reservation toReservation(User user, Child child, TherapistInfo therapistInfo, String addressDetail);


    @Mappings({
            @Mapping(source = "id", target = "reservationId"),
            @Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "user.firstName", target = "userName"),
            @Mapping(source = "child.id", target = "childId"),
            @Mapping(source = "child.lastName", target = "childName"),
            @Mapping(source = "child.dateOfBirth", target = "childAge"),
            @Mapping(source = "child.gender", target = "childGender"),
            @Mapping(source = "child.personality", target = "childPersonality"),
            @Mapping(source = "addressDetail", target = "addressDetail"),
            @Mapping(source = "status", target = "status")
    })
    ReservationResponseDto toReservationResponseDto(Reservation reservation);


    @Mappings({
            @Mapping(source = "reservation.id", target = "reservationId"),
            @Mapping(source = "therapistInfo.therapist.id", target = "therapistId"),
            @Mapping(source = "therapistInfo.therapist.firstName", target = "therapistName"),
            @Mapping(source = "therapistInfo.therapist.phoneNum", target = "therapistPhone"),
            @Mapping(source = "therapistInfo.totalExperience", target = "therapistTotalExperience"),
            @Mapping(source = "therapistSymptoms", target = "therapistSymptoms"),
            @Mapping(source = "reservation.addressDetail", target = "addressDetail"),
            @Mapping(source = "reservation.status", target = "status"),
            @Mapping(source = "centerNames", target = "therapistCenterName")
    })
    UserReservationDto toUserReservationDto(Reservation reservation, TherapistInfo therapistInfo, List<String> therapistSymptoms, List<String> centerNames);

    @Named("mapEnrolsToCenterNames")
    default List<String> mapEnrolsToCenterNames(List<Enrol> enrols) {
        return enrols.stream()
                .map(enrol -> enrol.getCenter().getName())
                .collect(Collectors.toList());
    }
}

