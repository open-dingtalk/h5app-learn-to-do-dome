package com.dingtalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @GetMapping("/toLearn")
    public String toLearn(@RequestParam("bizId") String bizId, @RequestParam("origin") String origin){
        return "redirect:" + origin + "/index.html?bizId=" + bizId;
    }
}
