package com.example.kidsconnect.mapping;

import com.example.kidsconnect.domain.Center;
import com.example.kidsconnect.domain.Symptom;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.mapstruct.factory.Mappers;

@NoArgsConstructor
@AllArgsConstructor
public class MapperFactory {

    UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    TherapistMapper therapistMapper = Mappers.getMapper(TherapistMapper.class);
    ChildMapper childMapper = Mappers.getMapper(ChildMapper.class);
    SymptomMapper symptomMapper = Mappers.getMapper(SymptomMapper.class);

    CenterMapper centerMapper = Mappers.getMapper(CenterMapper.class);
    TherapistInfoMapper therapistInfoMapper = Mappers.getMapper(TherapistInfoMapper.class);


}
