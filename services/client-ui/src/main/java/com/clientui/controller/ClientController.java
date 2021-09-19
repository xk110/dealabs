package com.clientui.controller;

import com.clientui.beans.CommentBean;
import com.clientui.beans.DealBean;
import com.clientui.beans.LoginForm;
import com.clientui.beans.SignUpForm;
import com.clientui.proxies.AuthServiceProxy;
import com.clientui.proxies.CommentServiceProxy;
import com.clientui.proxies.DealServiceProxy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/api")
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

    @GetMapping(value = "/deals")
    public ResponseEntity<List<DealBean>> getAll(@RequestHeader Map<String, String> headers) {
        headers.forEach((key, value) -> {
            LOGGER.info(String.format("Header '%s' = %s", key, value));
        });
        return dealServiceProxy.getAll();
    }

    @GetMapping(value = "/deals/{id}")
    public ResponseEntity<DealBean> getById(@PathVariable int id) {
        return dealServiceProxy.getById(id);
    }

    @PostMapping(value = "/deals")
    public DealBean addDeal(@RequestBody DealBean deal) {
        return dealServiceProxy.addDeal(deal);
    }

    @GetMapping(value = "/comments/{id_Deal}")
    public ResponseEntity<List<CommentBean>> getByIdDeal(@PathVariable String id_Deal) {
        return commentServiceProxy.getByIdDeal(id_Deal);
    }

    @PostMapping(value = "/comments")
    public CommentBean addComment(@RequestBody CommentBean comment) {
        return commentServiceProxy.addComment(comment);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpForm signUpForm) {
        return authServiceProxy.registerUser(signUpForm);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<?> signin(@RequestBody LoginForm loginForm) {
        return authServiceProxy.authenticateUser(loginForm);
    }
}
