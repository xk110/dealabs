package com.clientui.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class ClientUIInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String authorization = requestAttributes.getRequest().getHeader(HttpHeaders.AUTHORIZATION);
        if(null != authorization) {
            template.header(HttpHeaders.AUTHORIZATION, authorization);
        }
    }

}