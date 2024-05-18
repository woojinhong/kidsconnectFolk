package com.example.kidsconnect.dto;

import lombok.Data;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ChildDto {
    private Long childId;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private char gender;
    private String personality;

    private List<Long> symptomId;


    public List<Long> getSymptomId() {
        return symptomId;
    }

    public void setSymptomId(String symptomIdStr) {
        if (symptomIdStr != null && !symptomIdStr.isEmpty()) {
            String[] idArray = symptomIdStr.split(",");
            this.symptomId = new ArrayList<>();
            for (String id : idArray) {
                this.symptomId.add(Long.parseLong(id.trim()));
            }
        } else {
            this.symptomId = new ArrayList<>();
        }
    }
}
