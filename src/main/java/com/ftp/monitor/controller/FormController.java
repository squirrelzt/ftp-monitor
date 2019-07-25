package com.ftp.monitor.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/form")
public class FormController {

    @RequestMapping("/create")
    public String create(@RequestBody Object obj) {
        LOGGER.info("----------------------------");
//        log.info(obj);
        LOGGER.info(obj.toString());
        return "success";
    }

    @RequestMapping(value = "/query")
    public String query() {
        LOGGER.info("----------------------------");
        return "success";
    }
}
