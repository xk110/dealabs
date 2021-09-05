package com.dealabs.docker_microservices.authservice.service.serviceImpl;

import com.dealabs.docker_microservices.authservice.dao.UserDao;
import com.dealabs.docker_microservices.authservice.dto.request.LoginRequestDTO;
import com.dealabs.docker_microservices.authservice.dto.response.LoginResponseDTO;
import com.dealabs.docker_microservices.authservice.security.jwt.JwtTokenProvider;
import com.dealabs.docker_microservices.authservice.model.User;
import com.dealabs.docker_microservices.authservice.service.LoginService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@Transactional("transactionManager")
public class LoginServiceImpl implements LoginService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginServiceImpl.class);

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserDao userDao;

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {

        // Validate username or email
        Optional<User> user = StringUtils.isNotBlank(loginRequestDTO.getUsername()) ? userDao.findByUsername(loginRequestDTO.getUsername()) : userDao.findByEmail(loginRequestDTO.getEmail());
        if (!user.isPresent()) {
            LOGGER.info("User {} not found", loginRequestDTO.getUsername());
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User " + loginRequestDTO.getUsername() + " not found");
        }

        // Validate password
        if (!BCrypt.checkpw(loginRequestDTO.getPassword(), user.get().getPassword())) {
            LOGGER.info("Incorrect password");
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Incorrect password");
        }

        return LoginResponseDTO.builder().username(user.get().getUsername()).token(jwtTokenProvider.createToken(user.get().getUsername())).authorities(user.get().getRoles()).build();
    }

}

