package com.clientui.proxies;

import com.clientui.beans.LoginForm;
import com.clientui.beans.SignUpForm;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "zuul-server")
@RibbonClient(name = "microservice-auth-service")
public interface AuthServiceProxy {

    @PostMapping(value = "/microservice-auth-service/signup")
    ResponseEntity<?> registerUser(@RequestBody SignUpForm signUpForm);

    @PostMapping(value = "/microservice-auth-service/signin")
    ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginForm);

}
