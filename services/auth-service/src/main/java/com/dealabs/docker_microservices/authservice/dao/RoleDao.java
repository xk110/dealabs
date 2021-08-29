package com.dealabs.docker_microservices.authservice.dao;

import com.dealabs.docker_microservices.authservice.model.Role;
import com.dealabs.docker_microservices.authservice.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}