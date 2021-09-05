package com.dealabs.docker_microservices.authservice.dto.response;

import com.dealabs.docker_microservices.authservice.model.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponseDTO implements Serializable {

    String token;
    String type = "Bearer";
    String username;
    //Collection<? extends GrantedAuthority> authorities;
    Set<Role> authorities = new HashSet<>();
    String errorMessage;
}
