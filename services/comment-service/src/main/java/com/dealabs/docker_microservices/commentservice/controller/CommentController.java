package com.dealabs.docker_microservices.commentservice.controller;

import com.dealabs.docker_microservices.commentservice.dao.CommentDao;
import com.dealabs.docker_microservices.commentservice.model.Comment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class CommentController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommentController.class);
    private CommentDao commentDao;

    public CommentController(CommentDao commentDao) {
        this.commentDao = commentDao;
    }

    @GetMapping(value = "/comments/{id_Deal}")
    public ResponseEntity<List<Comment>> getByIdDeal(@PathVariable String id_Deal) {
        return new ResponseEntity<List<Comment>>(commentDao.findAllByIdDeal(Integer.valueOf(id_Deal)), HttpStatus.OK);
    }

    @PostMapping(value = "/comments", consumes = {"application/json"})
    public ResponseEntity<Void> addComment(@RequestBody Comment comment) {

        LOGGER.info("addComment {}", comment);

        Comment commentAdded = commentDao.save(comment);

        if (commentAdded == null)
            return ResponseEntity.noContent().build();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(commentAdded.getId())
                .toUri();

        return ResponseEntity.created(location).build();

    }
}