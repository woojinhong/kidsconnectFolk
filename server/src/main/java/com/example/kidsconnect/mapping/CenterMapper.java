package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Center;
import com.example.kidsconnect.dto.TherapistSignUpDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface CenterMapper {

    @Mapping(source = "centerName", target = "name")
    @Mapping(target = "id", ignore = true) // Ignore the id field
    @Mapping(target = "phoneNum", ignore = true) // Ignore the phoneNum field
    @Mapping(target = "centerNum", ignore = true) // Ignore the centerNum field
    @Mapping(target = "postalCode", ignore = true) // Ignore the postalCode field
    @Mapping(target = "addressDetail", ignore = true) // Ignore the addressDetail field
    @Mapping(target = "address", ignore = true) // Ignore the address field
    @Mapping(target = "imageFile", ignore = true) // Ignore the imageFile field
    @Mapping(target = "inDate", ignore = true) // Ignore the inDate field
    @Mapping(target = "upDate", ignore = true) // Ignore the upDate field
    @Mapping(target = "centerReview", ignore = true) // Ignore the centerReview field
    @Mapping(target = "enrol", ignore = true) // Ignore the enrol field
    Center fromTherapistSignUpDto(TherapistSignUpDto therapistSignUpDto);
}
