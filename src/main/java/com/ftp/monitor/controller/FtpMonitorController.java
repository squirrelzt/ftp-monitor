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
//        Map result = new HashMap(5);
//        result.put("YE2019022799861", "D:/data/gold-goods-common/data/9986/2019/201902/20190227/YE2019022799861.txt");
        return list;
    }
}
