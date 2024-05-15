package com.example.kidsconnect.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Response<T> {

    String code;
    String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    T detail;

    public Response(String code, String message) {
        this.code = code;
        this.message = message;

    }


}
