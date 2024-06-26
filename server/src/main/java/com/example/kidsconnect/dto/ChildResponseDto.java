        package com.example.kidsconnect.dto;

        import lombok.Data;

        import java.util.Date;
        import java.util.List;
        @Data
        public class ChildResponseDto {


                private Long id;
                private String firstName;
                private String lastName;
                private Date dateOfBirth;
                private char gender;
                private String personality;

                private List<String> symptomName;

            }

