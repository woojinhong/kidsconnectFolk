package com.example.kidsconnect.mapping;
import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.dto.TherapistInfoDto;

import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface TherapistInfoMapper {

    TherapistInfoDto toTherapistInfoDto(TherapistInfo therapistInfo);

    TherapistInfo toTherapistInfo(TherapistInfoDto therapistInfoDto);

}


