package com.ftp.monitor;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class FtpMonitorApplication {
    public static void main(String[] args) {
        new SpringApplicationBuilder(FtpMonitorApplication.class).run(args);
    }
}
