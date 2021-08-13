package com.clientui.proxies;

import com.clientui.beans.CommentBean;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "zuul-server")
@RibbonClient(name = "microservice-comment-service")
public interface CommentServiceProxy {

    @GetMapping(value = "/microservice-comment-service/comments/{id_Deal}")
    List<CommentBean> getByIdDeal(@PathVariable String id_Deal);

    @PostMapping(value = "/microservice-comment-service/comments")
    CommentBean addComment(@RequestBody CommentBean comment);

}
