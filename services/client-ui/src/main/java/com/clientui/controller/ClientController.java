package com.clientui.controller;

import com.clientui.beans.*;
import com.clientui.proxies.AuthServiceProxy;
import com.clientui.proxies.CommentServiceProxy;
import com.clientui.proxies.DealServiceProxy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {

    private static final Logger LOGGER = LoggerFactory.getLogger(
            ClientController.class);

    @Autowired
    private AuthServiceProxy authServiceProxy;

    @Autowired
    private DealServiceProxy dealServiceProxy;

    @Autowired
    private CommentServiceProxy commentServiceProxy;
    private LoginForm loginForm;

    @GetMapping(value = "/api/v1/deals")
    public ResponseEntity<List<DealBean>> getAll() {
        return dealServiceProxy.getAll();
    }

    @GetMapping(value = "/api/v1/deals/{id}")
    public DealBean getById(@PathVariable int id) {
        return dealServiceProxy.getById(id);
    }

    @PostMapping(value = "/api/v1/deals")
    public DealBean addDeal(@RequestBody DealBean deal) {
        return dealServiceProxy.addDeal(deal);
    }

    @GetMapping(value = "/api/v1/comments/{id_Deal}")
    public List<CommentBean> getByIdDeal(@PathVariable String id_Deal) {
        return commentServiceProxy.getByIdDeal(id_Deal);
    }

    @PostMapping(value = "/api/v1/comments")
    public CommentBean addComment(@RequestBody CommentBean comment) {
        return commentServiceProxy.addComment(comment);
    }

    @PostMapping(value = "/api/v1/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpForm signUpForm) {
        return authServiceProxy.registerUser(signUpForm);
    }

    @PostMapping(value = "/api/v1/signin")
    public ResponseEntity<?> signin(@RequestBody LoginForm loginForm) {
        return authServiceProxy.authenticateUser(loginForm);
    }
}
