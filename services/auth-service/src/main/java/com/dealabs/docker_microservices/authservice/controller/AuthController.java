package com.dealabs.docker_microservices.authservice.controller;

import com.dealabs.docker_microservices.authservice.dao.RoleDao;
import com.dealabs.docker_microservices.authservice.dao.UserDao;
import com.dealabs.docker_microservices.authservice.dto.request.LoginRequestDTO;
import com.dealabs.docker_microservices.authservice.dto.request.SignupRequestDTO;
import com.dealabs.docker_microservices.authservice.dto.response.LoginResponseDTO;
import com.dealabs.docker_microservices.authservice.dto.response.SignupResponseDTO;
import com.dealabs.docker_microservices.authservice.model.Role;
import com.dealabs.docker_microservices.authservice.model.RoleName;
import com.dealabs.docker_microservices.authservice.model.User;
import com.dealabs.docker_microservices.authservice.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.http.ResponseEntity.ok;

@PropertySource("classpath:bootstrap.properties")
@RestController
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder encoder;

    public AuthController(UserDao userDao) {
        this.userDao = userDao;
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginRequestDTO requestDTO) {
        LOGGER.info("requestDTO: {}", requestDTO.toString());
        LoginResponseDTO loginResponseDTO = loginService.login(requestDTO);
        return ok().body(loginResponseDTO);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<SignupResponseDTO> registerUser(@Valid @RequestBody SignupRequestDTO responseDTO) {

        LOGGER.info("responseDTO: {}", responseDTO.toString());

        if (userDao.existsByUsername(responseDTO.getUsername())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User " + responseDTO.getUsername() + " is already taken");
        }

        if (userDao.existsByEmail(responseDTO.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Email " + responseDTO.getEmail() + " is already in use");
        }

        // Creating user's account
        User user = User.builder().username(responseDTO.getUsername()).email(responseDTO.getEmail()).password(encoder.encode(responseDTO.getPassword())).build();

        Set<String> strRoles = responseDTO.getRole();
        Set roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    Role adminRole = roleDao.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                    roles.add(adminRole);

                    break;
                case "pm":
                    Role pmRole = roleDao.findByName(RoleName.ROLE_PM)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                    roles.add(pmRole);

                    break;
                default:
                    Role userRole = roleDao.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                    roles.add(userRole);
            }
        });

        user.setRoles(roles);
        userDao.save(user);

        return new ResponseEntity<SignupResponseDTO>(new SignupResponseDTO("User registered successfully!"), HttpStatus.OK);
    }
}