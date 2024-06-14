package com.example.kidsconnect.domain;

import java.util.Set;

public interface Loginable {
    Long id();
    String email();
    String password();
    Enum role();
}
