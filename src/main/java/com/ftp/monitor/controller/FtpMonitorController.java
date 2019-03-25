package com.ftp.monitor.controller;

import com.ftp.monitor.service.FtpMonitorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ftp")
public class FtpMonitorController {

    private final FtpMonitorService ftpMonitorService;

    public FtpMonitorController(FtpMonitorService ftpMonitorService) {
        this.ftpMonitorService = ftpMonitorService;
    }

    @RequestMapping("/listFiles")
    public List listFiles() {
        List list = ftpMonitorService.listFtpFiles();
        return list;
    }
}
