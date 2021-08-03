package com.clientui.controller;

import com.clientui.beans.CommentBean;
import com.clientui.beans.DealBean;
import com.clientui.proxies.CommentServiceProxy;
import com.clientui.proxies.DealServiceProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {

    @Autowired
    private DealServiceProxy dealServiceProxy;

    @Autowired
    private CommentServiceProxy commentServiceProxy;

    @GetMapping(value = "/api/v1/deals")
    public List<DealBean> getAll() {
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

}
