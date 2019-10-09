package com.ftp.monitor.controller;

import com.ftp.monitor.config.WebSocketAutoConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.swing.text.html.parser.Entity;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/ws")
public class WebSocketController {

    @RequestMapping("/send")
    public void sendMessage() {
        Map<String, WebSocketSession> sessionMap = WebSocketAutoConfig.sessionMap;
        Map<String, String> businessKeyMap = WebSocketAutoConfig.businessKeyMap;
        Set<Map.Entry<String, WebSocketSession>> set = sessionMap.entrySet();
        for (Map.Entry<String, WebSocketSession> entry: sessionMap.entrySet()) {
            WebSocketSession session = entry.getValue();
            try {
                session.sendMessage(new TextMessage(new Date() + " send msg"));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        LOGGER.info("---------------------");
    }
}
