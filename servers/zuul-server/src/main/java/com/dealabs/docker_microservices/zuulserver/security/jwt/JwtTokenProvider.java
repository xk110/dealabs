package com.dealabs.docker_microservices.zuulserver.security.jwt;

import com.dealabs.docker_microservices.zuulserver.constants.SecurityConstants;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secretKey}")
    private String jwtSecret;

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader(SecurityConstants.AUTHORIZATION_HEADER);

        return (!Objects.isNull(bearerToken) && bearerToken.startsWith(SecurityConstants.BEARER_PREFIX)) ?
                bearerToken.substring(7, bearerToken.length()) : null;
    }

    public Optional<Authentication> createAuthentication(String token) {

        Jws<Claims> jwsClaims = validateJwtToken(token);
        if (jwsClaims == null) {
            return Optional.empty();
        }

        Claims claims = jwsClaims.getBody();

        String scopesString = claims.get("scopes").toString();
        String[] authStrings = scopesString.split(",");

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(authStrings)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        String subject = claims.getSubject();
        User principal = new User(subject, "", authorities);

        return Optional.of(new UsernamePasswordAuthenticationToken(principal, token, authorities));
    }

    public Jws<Claims> validateJwtToken(String authToken) {
        try {
            return  Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            logger.error("JWT claims string is empty -> Message: {}", e);
        }

        return null;
    }

/*    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
    }*/
}