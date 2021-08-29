package com.dealabs.docker_microservices.dealservice.controller;

import com.dealabs.docker_microservices.dealservice.dao.DealDao;
import com.dealabs.docker_microservices.dealservice.model.Deal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class DealController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DealController.class);
    private DealDao dealDao;

    public DealController(DealDao dealDao){
        this.dealDao = dealDao;
    }

    @GetMapping(value = "/deals")
    public ResponseEntity<List<Deal>> getAll() {
        List<Deal> listOfDeals = dealDao.findAll();
        LOGGER.info("listOfDeals {}", listOfDeals);
        return new ResponseEntity<List<Deal>>(listOfDeals, HttpStatus.OK);
    }

    @GetMapping(value = "/deals/{id}")
    public Deal getById(@PathVariable int id) {
        return dealDao.findById(id);
    }

    @PostMapping(value = "/deals")
    public ResponseEntity<Void> addDeal(@RequestBody Deal deal) {

        LOGGER.info("addDeal {}", deal);

        Deal dealAdded = dealDao.save(deal);

        if (dealAdded == null)
            return ResponseEntity.noContent().build();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(dealAdded.getId())
                .toUri();

        return ResponseEntity.created(location).build();

    }
}