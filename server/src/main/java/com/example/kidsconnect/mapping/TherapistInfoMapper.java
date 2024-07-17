package com.example.kidsconnect.mapping;
import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.domain.TherapistInfoSymptom;
import com.example.kidsconnect.dto.TherapistInfoDto;

import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface TherapistInfoMapper {

    List<TherapistInfoDto> toTherapistInfoDtos(List<TherapistInfo> therapistInfos);

    TherapistInfo toTherapistInfo(TherapistInfoDto therapistInfoDto);

    @Mapping(target = "symptom", source = "therapistInfoSymptom", qualifiedByName = "mapSymptoms")
    TherapistInfoDto toTherapistInfoDto(TherapistInfo therapistInfo);

    @Named("mapSymptoms")
    default List<String> mapSymptoms(List<TherapistInfoSymptom> therapistInfoSymptoms) {
        List<String> symptomNames = new ArrayList<>();
        for (TherapistInfoSymptom therapistInfoSymptom : therapistInfoSymptoms) {
            symptomNames.add(therapistInfoSymptom.getSymptom().getName());
        }
        return symptomNames;
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "experience", ignore = true) // 경험 필드 무시
    @Mapping(target = "education", ignore = true) // 교육 필드 무시
    @Mapping(target = "therapistInfoSymptom", ignore = true) // 증상 필드 무시
    void updateEntityFromDto(TherapistInfoDto therapistInfoDto, @MappingTarget TherapistInfo therapistInfo);

}


