package com.clientui.config;

import com.clientui.interceptor.ClientUIInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClientUIConfig {

    @Bean
    public ClientUIInterceptor basicAuthRequestInterceptor() {
        return new ClientUIInterceptor();
    }
}
