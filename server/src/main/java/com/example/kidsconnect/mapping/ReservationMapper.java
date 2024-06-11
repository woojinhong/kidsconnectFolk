package com.example.kidsconnect.mapping;


import com.example.kidsconnect.domain.*;
import com.example.kidsconnect.dto.ReservationRequestDto;
import com.example.kidsconnect.dto.ReservationResponseDto;
import com.example.kidsconnect.dto.TherapistInfoDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    ReservationMapper INSTANCE = Mappers.getMapper(ReservationMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "child", source = "child")
    @Mapping(target = "therapist", source = "therapist")
    @Mapping(target = "addressDetail", source = "location")
    @Mapping(target = "status", constant = "PENDING")
    Reservation toEntity(ReservationRequestDto requestDto, User user, Child child, Therapist therapist, String location);
}
    ReservationResponseDto toReservationResponseDto(Therapist therapist, TherapistInfo therapistInfo, Child child, User user);

    TherapistInfo requestToTherapistInfo(ReservationRequestDto reservationRequestDto);

}
