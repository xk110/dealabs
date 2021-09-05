package com.dealabs.docker_microservices.zuulserver.security;

import com.dealabs.docker_microservices.zuulserver.security.jwt.JwtTokenFilter;
import com.dealabs.docker_microservices.zuulserver.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .antMatchers("/microservice-auth-service/signup/**").permitAll()
                .antMatchers("/microservice-auth-service/signin/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest().permitAll();// authenticated();

        // Add JWT token filter
//        httpSecurity.addFilterBefore(
//                jwtTokenFilter, UsernamePasswordAuthenticationFilter.class
//        );
    }
}
