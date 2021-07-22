package com.dealabs.docker_microservices.dealservice.dao;

import com.dealabs.docker_microservices.dealservice.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealDao extends JpaRepository<Deal, Integer> {
    public List<Deal> findAll();

    public Deal findById(int id);

    public Deal save(Deal deal);
}