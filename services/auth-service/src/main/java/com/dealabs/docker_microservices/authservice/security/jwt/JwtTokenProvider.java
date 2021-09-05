package com.dealabs.docker_microservices.authservice.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.validityInMilliseconds}")
    private int validityInMilliseconds;

    public String createToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(calculateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    private Date calculateExpirationDate() {
        Date now = new Date();
        return new Date(now.getTime() + validityInMilliseconds);
    }
}
