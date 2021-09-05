package com.dealabs.docker_microservices.authservice.service;

import com.dealabs.docker_microservices.authservice.dto.request.LoginRequestDTO;
import com.dealabs.docker_microservices.authservice.dto.response.LoginResponseDTO;

import javax.servlet.http.HttpServletRequest;

public interface LoginService {

    LoginResponseDTO login(LoginRequestDTO requestDTO);

}
