package com.clientui.proxies;

import com.clientui.beans.DealBean;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "microservice-deal-service")
@RibbonClient(name = "microservice-deal-service")
public interface DealServiceProxy {

    @GetMapping(value = "/deals")
    List<DealBean> getAll();

    @GetMapping(value = "/deals/{id}")
    DealBean getById(@PathVariable int id);

    @PostMapping(value = "/deals")
    DealBean addDeal(@RequestBody DealBean deal);

}
