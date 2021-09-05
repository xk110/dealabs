package com.dealabs.docker_microservices.authservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SignupRequestDTO {

    String username;
    String email;
    Set<String> role;
    String password;

}
